
using System.Linq.Dynamic.Core;
using Api.Common;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using pbl6_be.Common.Utilities.Exceptions;
using pbl6_be.Domain;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Domain.ModelSettings;
using pbl6_be.Hubs;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using Trouble_Resolving_SystemBackEnd.Extensions;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Services
{
    public class VnPayService : IVnPayService
    {
        private readonly VnPaySetting _vnPaySetting;
        private ILogger<VnPayService> _logger;
        public readonly Context _context;
        private IHubContext<OrderHub, ITypedHubClient> _realTimeContext;

        public VnPayService(Context context,
                             IOptions<VnPaySetting> vnPaySetting,
                             ILogger<VnPayService> logger,
                             IHubContext<OrderHub, ITypedHubClient> realTimeContext)
        {
            this._context = context;
            _vnPaySetting = vnPaySetting.Value;
            this._logger = logger;
            this._realTimeContext = realTimeContext;
        }
        public async Task<string> CreatePaymentUrl(CreatePaymentRequest request, HttpContext context, UserType userType)
        {
            var trans = _context.Database.BeginTransaction();
            TimeSpan offset = TimeSpan.Parse("07:00");
            DateTimeOffset now = DateTimeOffset.UtcNow.ToOffset(offset);
            var pay = new VnPayHelper();
            var paymentUrl = "";
            try
            {
                var order = await this._context.Orders
                                    .Include(o => o.OrderDetails)
                                    .ThenInclude(od => od.Food)
                                    .Include(o => o.Table)
                                    .FirstOrDefaultAsync(o => o.Id == request.OrderId);
                if (order is null)
                {
                    throw new NotFoundException("order not found by Id: " + request.OrderId);
                }
                CanPaymentOrder(order);
                order.OrderStatus = OrderStatus.Payment;
                var payment = new Payment();

                payment.OrderId = order.Id;
                payment.PaymentDate = now.DateTime;
                payment.Type = request.Type;
                payment.TotalAmount = Convert.ToDecimal(GetTotal(order));
                payment.Status = PaymentStatus.UnPaid;
                _context.Payments.Add(payment);
                _context.Entry(payment).State = EntityState.Added;
                _context.Entry(order).State = EntityState.Modified;
                _context.SaveChanges();

                if (request.Type == PaymentType.Online)
                {
                    pay.AddRequestData("vnp_Version", _vnPaySetting.Version);
                    pay.AddRequestData("vnp_Command", _vnPaySetting.Command);
                    pay.AddRequestData("vnp_TmnCode", _vnPaySetting.TmnCode);
                    pay.AddRequestData("vnp_Amount", (payment.TotalAmount * 100).ToString());
                    pay.AddRequestData("vnp_CreateDate", now.DateTime.ToString("yyyyMMddHHmmss"));
                    pay.AddRequestData("vnp_CurrCode", _vnPaySetting.CurrCode);
                    pay.AddRequestData("vnp_IpAddr", pay.GetIpAddress(context));
                    pay.AddRequestData("vnp_Locale", _vnPaySetting.Locale);
                    pay.AddRequestData("vnp_OrderInfo", $"Đơn hàng");
                    pay.AddRequestData("vnp_OrderType", "180000");
                    pay.AddRequestData("vnp_ReturnUrl", _vnPaySetting.ReturnUrl);
                    pay.AddRequestData("vnp_TxnRef", payment.Id.ToString());

                    paymentUrl =
                        pay.CreateRequestUrl(_vnPaySetting.BaseUrl, _vnPaySetting.HashSecret);

                    try
                    {
                        if (userType == UserType.Table && request.Type == PaymentType.Cash)
                        {
                            await _realTimeContext.Clients.All.SendNotification("CreateCashPayment:" + order.Table.Name + ":" + order.Table.Id);
                        }
                    }
                    catch (Exception e)
                    {

                    }
                }
                trans.Commit();
                return paymentUrl;
            }
            catch (Exception e)
            {
                trans.Rollback();
                throw;
            }
        }

        public async Task PaymentExecute(IQueryCollection collections)
        {
            try
            {

                _logger.LogInformation("Start");
                TimeSpan offset = TimeSpan.Parse("07:00");
                DateTimeOffset now = DateTimeOffset.UtcNow.ToOffset(offset);
                var pay = new VnPayHelper();
                var response = pay.GetFullResponseData(collections, _vnPaySetting.HashSecret);

                if (response != null)
                {
                    _logger.LogInformation("Dung");
                    _logger.LogInformation("Code:" + response.VnPayResponseCode);
                    if (response.VnPayResponseCode == "00")
                    {
                        var payment = await this._context.Payments
                                                        .Include(pm => pm.Order)
                                                        .ThenInclude(o => o.Table)
                                                        .FirstOrDefaultAsync(pm => pm.Id.ToString() == response.OrderId);


                        payment.PaymentDate = now.DateTime;
                        payment.Status = PaymentStatus.Paid;
                        payment.Order.OrderStatus = OrderStatus.Done;
                        _context.Entry(payment).State = EntityState.Modified;
                        _context.Entry(payment.Order).State = EntityState.Modified;
                        _context.SaveChanges();

                        try
                        {
                            await _realTimeContext.Clients.All.SendNotification("Payment:" + payment.Order.Table.Name + ":" + payment.Order.Table.Id);
                        }
                        catch (Exception e)
                        {

                        }
                    }
                    else
                    {
                        var payment = await this._context.Payments
                                .Include(pm => pm.Order)
                                .ThenInclude(o => o.Table)
                                .FirstOrDefaultAsync(pm => pm.Id.ToString() == response.OrderId);
                        try
                        {
                            await _realTimeContext.Clients.All.SendNotification("ErrorPayment:" + payment.Order.Table.Name + ":" + payment.Order.Table.Id);
                        }
                        catch (Exception e)
                        {

                        }
                    }
                }
                else
                {
                    _logger.LogInformation("Sai");
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.StackTrace.ToString());
            }
        }

        private void CanPaymentOrder(Order order)
        {
            if (order.OrderDetails.Any(od => od.Status == OrderDetailStatus.Open || od.Status == OrderDetailStatus.InProgress))
            {
                throw new BadRequestException("There are still dishes in service");
            }
        }

        private double GetTotal(Order order)
        {
            double total = 0;
            foreach (var od in order.OrderDetails)
            {
                if (od.Status == OrderDetailStatus.Done)
                {
                    total += Convert.ToDouble(od.Food.Price * od.Quantity);
                }
            }
            return Math.Round(total, 1);
        }

        public async Task ConfirmPayment(int paymentId)
        {
            TimeSpan offset = TimeSpan.Parse("07:00");
            DateTimeOffset now = DateTimeOffset.UtcNow.ToOffset(offset);
            var payment = await this._context.Payments
                                .Include(pm => pm.Order)
                                .ThenInclude(o => o.Table)
                                .FirstOrDefaultAsync(pm => pm.Id == paymentId && pm.Type == PaymentType.Cash && pm.Status == PaymentStatus.UnPaid);

            if (payment is null)
            {
                throw new NotFoundException("Payment not found by Id: " + paymentId);
            }

            payment.PaymentDate = now.DateTime;
            payment.Status = PaymentStatus.Paid;
            payment.Order.OrderStatus = OrderStatus.Done;
            _context.Entry(payment).State = EntityState.Modified;
            _context.Entry(payment.Order).State = EntityState.Modified;

            _context.SaveChanges();

            try
            {
                await _realTimeContext.Clients.All.SendNotification("ConfirmCashPayment:" + payment.Order.Table.Name + ":" + payment.Order.Table.Id);
            }
            catch (Exception e)
            {

            }
        }

        public async Task<Pagination<Payment>> Get(int orderId)
        {
            Pagination<Payment> response = new Pagination<Payment>();
            var payment = this._context.Payments
                                    .IgnoreAutoIncludes()
                                    .Where(pm => pm.OrderId == orderId && pm.Status == PaymentStatus.UnPaid);
            response.data = await payment.ToListAsync();
            response.count = payment.Count();
            return response;
        }

        public async Task<Pagination<Payment>> GetAll(GetAllPaymentRequest request)
        {
            Pagination<Payment> response = new Pagination<Payment>();
            var payment = this._context.Payments
                                    .IgnoreAutoIncludes()
                                    .AsQueryable()
                                    .AsNoTracking();
            if (request.OrderId != null)
            {
                payment = payment.Where(pm => pm.OrderId == request.OrderId);
            }
            if (request.Status != null)
            {
                payment = payment.Where(pm => pm.Status == request.Status);
            }
            if (request.Type != null)
            {
                payment = payment.Where(pm => pm.Type == request.Type);
            }
            payment = payment.Where(pm => pm.PaymentDate >= request.StartDate && pm.PaymentDate <= request.EndDate);
            payment = payment.Pagination(request.Offset, request.Limit);
            var count = payment.Count();
            response.data = payment.ToList();
            response.count = count;
            return response;
        }
    }
}
