using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using pbl6_be.Common.Utilities.Exceptions;
using pbl6_be.Domain;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Hubs;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using Trouble_Resolving_SystemBackEnd.Extensions;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Services
{
    public class OrderService : IOrderService
    {
        public readonly Context _context;
        private ILogger<OrderService> _logger;
        private readonly IMapper _mapper;
        private IHubContext<OrderHub, ITypedHubClient> _realTimeContext;
        public OrderService(Context context,
                            ILogger<OrderService> logger,
                            IMapper mapper,
                            IHubContext<OrderHub, ITypedHubClient> realTimeContext)
        {
            this._context = context;
            this._logger = logger;
            this._mapper = mapper;
            this._realTimeContext = realTimeContext;
        }
        public async Task<OrderResponse> Get(int orderId)
        {
            try
            {
                var order = await this._context.Orders
                                                .Include(o => o.OrderDetails)
                                                .Include(o => o.Table)
                                                .AsNoTracking()
                                                .FirstOrDefaultAsync(o => o.Id == orderId);
                if (order is null)
                {
                    throw new NotFoundException("order not found by Id: " + orderId);
                }
                return this._mapper.Map<Order, OrderResponse>(order);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Get Order failed .  Error = {Message} ", ex.Message);
                throw;
            }
        }

        public async Task<Pagination<OrderResponse>> GetAll(UserType usertype, GetAllOrderRequest request)
        {
            try
            {
                Pagination<OrderResponse> response = new Pagination<OrderResponse>();
                var query = _context.Orders
                                    .Include(o => o.OrderDetails)
                                    .ThenInclude(od => od.Food)
                                    .Include(o => o.Payments)
                                    .Include(o => o.Table)
                                    .AsNoTracking()
                                    .AsQueryable();
                if (!(request.TableId is null))
                {
                    if (this._context.Tables.FirstOrDefault(t => t.Id == request.TableId) is null)
                        throw new NotFoundException("Table id is not exist");
                    else
                        query = query.Where(o => o.TableId == request.TableId);

                }
                if (!(request.OrderTime is null))
                {
                    query = query.Where(o => o.OrderTime.Date == request.OrderTime.Value.Date);
                }
                if (!(request.OrderStatus is null))
                {
                    query = query.Where(o => o.OrderStatus == request.OrderStatus);
                }
                if (!(request.SearchBy is null) && request.SearchBy != OrderSearchBy.None)
                {
                    switch (request.SearchBy)
                    {
                        case OrderSearchBy.Id:
                            query = query.Where(o => o.Id.ToString() == request.Search);
                            break;
                        case OrderSearchBy.TableName:
                            query = query.Where(o => o.Table.TableName.Contains(request.Search));
                            break;
                    }
                }
                if (usertype == UserType.Staff)
                {
                    query = query.Where(o => o.OrderStatus != OrderStatus.Done && o.OrderStatus != OrderStatus.Cancel);
                }
                query = query.OrderByExt(request.SortBy.ToString(), request.Direction);

                var count = query.Count();
                query = query.Pagination(request.Offset, request.Limit);
                var orders = await query.Select(c => _mapper.Map<Order, OrderResponse>(c)).ToListAsync();
                response.data = orders;
                response.count = count;
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Get Order failed .  Error = {Message} ", ex.Message);
                throw;
            }
        }

        public async Task<OrderResponse> Order(OrderRequest request, int orderId, int? tableid)
        {
            var trans = this._context.Database.BeginTransaction();
            try
            {
                var order = await this._context.Orders
                                    .Include(o => o.OrderDetails)
                                    .ThenInclude(od => od.Food)
                                    .Include(o => o.Payments)
                                    .Include(o => o.Table)
                                                .FirstOrDefaultAsync(o => o.Id == orderId);

                if (order is null)
                {
                    throw new NotFoundException("order not found by Id: " + orderId);
                }
                if (tableid != null)
                {
                    if (order.TableId != tableid.Value)
                    {
                        throw new UnAuthorizedException("Permisstion denied");
                    }
                }
                var oldOrderDetail = order.OrderDetails.ToList();
                OrderDetail orderDetail = null;
                foreach (var r in request.Orders)
                {
                    // new
                    orderDetail = oldOrderDetail.FirstOrDefault(od => od.Id == r.OrderDetailId);
                    if (orderDetail != null)
                    {
                        if (orderDetail.Quantity < r.Quantity 
                            && (orderDetail.Status == OrderDetailStatus.InProgress || orderDetail.Status == OrderDetailStatus.Open))
                        {
                            order.OrderDetails.First(od => od.Id == orderDetail.Id).Quantity = r.Quantity;
                        }
                        else
                        {
                            if (orderDetail.Status == OrderDetailStatus.InProgress
                            || orderDetail.Status == OrderDetailStatus.Done
                            || orderDetail.Status == OrderDetailStatus.Cancel)
                            {
                                throw new BadRequestException("Can't Change Quantity");
                            }
                            else
                            {
                                order.OrderDetails.First(od => od.Id == orderDetail.Id).Quantity = r.Quantity;
                            }
                        }
                    }
                    else
                    {
                        if (r.Quantity <= 0)
                        {
                            throw new BadRequestException("Quantity is error");
                        }
                        if (this._context.Foods.FirstOrDefault(f => f.Id == r.FoodId) is null)
                        {
                            throw new BadRequestException("Food is not exist");
                        }
                        orderDetail = oldOrderDetail.FirstOrDefault(od => od.FoodId == r.FoodId 
                                                                     && od.Status != OrderDetailStatus.Done 
                                                                     && od.Status != OrderDetailStatus.Cancel
                                                                    );
                        if (orderDetail != null)
                        {
                            orderDetail.Quantity += r.Quantity;
                            _context.Entry(orderDetail).State = EntityState.Modified;
                        }
                        else
                        {
                            orderDetail = new OrderDetail();
                            orderDetail.FoodId = r.FoodId;
                            orderDetail.Quantity = r.Quantity;
                            orderDetail.Status = OrderDetailStatus.Open;
                            orderDetail.OrderId = order.Id;
                            _context.OrderDetails.Add(orderDetail);
                            _context.Entry(orderDetail).State = EntityState.Added;
                        }
                    }
                    this._context.SaveChanges();
                }
                order.OrderStatus = OrderStatus.Progress;
                _context.Entry(order).State = EntityState.Modified;
                this._context.SaveChanges();
                trans.Commit();
                try
                {
                    await _realTimeContext.Clients.All.SendNotification("Order" + orderId.ToString());
                }
                catch (Exception e)
                {

                }
                return this._mapper.Map<Order, OrderResponse>(order);
            }
            catch (Exception ex)
            {
                trans.Rollback();
                throw;
            }
        }

        public async Task<bool> UpdateStatusOrder(int orderId, OrderStatus newStatus)
        {
            try
            {
                var order = await this._context.Orders
                                                .Include(o => o.OrderDetails)
                                                .ThenInclude(od => od.Food)
                                                .Include(o => o.Payments)
                                                .Include(o => o.Table)
                                                .FirstOrDefaultAsync(o => o.Id == orderId);
                if (order is null)
                {
                    throw new NotFoundException("order not found by Id: " + orderId);
                }
                if (newStatus <= order.OrderStatus)
                {
                    throw new BadRequestException("Can't Update Status Order Detail");
                }
                if (order.OrderDetails.Any(od => od.Status != OrderDetailStatus.Cancel)
                       && newStatus == OrderStatus.Cancel)
                    throw new NotFoundException("Order Cannot be canceled because the order has already been placed");
                if (order.OrderDetails.Any(od => od.Status == OrderDetailStatus.Open || od.Status == OrderDetailStatus.InProgress)
                        && (newStatus == OrderStatus.Done || newStatus == OrderStatus.Payment))
                    throw new NotFoundException("The order are still dishes being served");
                if (newStatus == OrderStatus.Done
                    && order.Payments.Where(pm => pm.Status == PaymentStatus.Paid).Sum(pm => pm.TotalAmount)
                        == order.OrderDetails.Sum(od => od.Quantity * od.Food.Price)
                    )
                    throw new NotFoundException("Order has not been paid in full");
                order.OrderStatus = newStatus;
                this._context.Entry(order).State = EntityState.Modified;
                this._context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<bool> UpdateStatusOrderDetail(int orderId, int orderDetailId, int? tableid, OrderDetailStatus newStatus)
        {
            try
            {
                var order = await this._context.Orders
                                                .Include(o => o.OrderDetails)
                                                .ThenInclude(od => od.Food)
                                                .Include(o => o.Payments)
                                                .Include(o => o.Table)
                                                .FirstOrDefaultAsync(o => o.Id == orderId);

                if (order is null)
                {
                    throw new NotFoundException("order not found by Id: " + orderId);
                }
                if (tableid != null && order.TableId != tableid)
                {
                    throw new NotFoundException("order detail not found by Id: " + orderDetailId);
                }
                var orderDetail = order.OrderDetails.FirstOrDefault(od => od.Id == orderDetailId);
                if (orderDetail is null)
                {
                    throw new NotFoundException("order detail not found by Id: " + orderDetailId);
                }
                if (tableid != null && newStatus != OrderDetailStatus.Cancel)
                {
                    throw new BadRequestException("Can't Update Status Order Detail");
                }
                if (newStatus <= orderDetail.Status)
                {
                    throw new BadRequestException("Can't Update Status Order Detail");
                }
                if (newStatus == OrderDetailStatus.Cancel && orderDetail.Status != OrderDetailStatus.Open)
                {
                    throw new BadRequestException("Order cannot be canceled");
                }

                orderDetail.Status = newStatus;
                this._context.Entry(orderDetail).State = EntityState.Modified;
                this._context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<OrderResponse> CreateOrder(CreateOrderRequest request)
        {
            try
            {
                if (this._context.Tables.FirstOrDefault(t => t.Id == request.TableId) is null)
                    throw new NotFoundException("Table id is not exist");
                var orders = this._context.Orders
                                .Include(o => o.OrderDetails)
                                .AsNoTracking()
                                .Where(o => o.TableId == request.TableId && (o.OrderStatus != OrderStatus.Done &&
                                                                                    o.OrderStatus != OrderStatus.Cancel));
                if (orders.Count() > 0)
                {
                    throw new BadRequestException("Order is exist");
                }
                var order = new Order();
                TimeSpan offset = TimeSpan.Parse("07:00");
                DateTimeOffset now = DateTimeOffset.UtcNow.ToOffset(offset);
                order.OrderStatus = OrderStatus.Open;
                order.UserId = 1;
                order.OrderTime = now.DateTime;
                order.TableId = request.TableId;

                await this._context.Orders.AddAsync(order);
                this._context.Entry(order).State = EntityState.Added;
                this._context.SaveChanges();
                return this._mapper.Map<Order, OrderResponse>(order);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<OrderResponse> GetByTable(int tableid)
        {
            try
            {
                var order = await this._context.Orders
                                                .Include(o => o.OrderDetails)
                                                .ThenInclude(od => od.Food)
                                                .Include(o => o.Payments)
                                                .Include(o => o.OrderDetails)
                                                .Include(o => o.Table)
                                                .AsNoTracking()
                                                .FirstOrDefaultAsync(o => o.TableId == tableid && (o.OrderStatus != OrderStatus.Done &&
                                                                                                    o.OrderStatus != OrderStatus.Cancel));
                if (order is null)
                {
                    throw new NotFoundException("order not found");
                }
                return this._mapper.Map<Order, OrderResponse>(order);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Get Order failed .  Error = {Message} ", ex.Message);
                throw;
            }
        }
    }
}
