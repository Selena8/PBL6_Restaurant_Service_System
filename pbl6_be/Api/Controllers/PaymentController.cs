using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using pbl6_be.Common.Utilities.Exceptions;
using pbl6_be.Domain;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Services;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Api.Controllers
{
    [Route("api/payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private IVnPayService _vnPayService;
        private Context _context;
        public PaymentController(IVnPayService vnPayService,
                                Context context)
        {
            this._vnPayService = vnPayService;
            this._context = context;
        }

        [HttpPost("create-payment/online/{orderId}")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff, Common.Enum.UserType.Admin, Common.Enum.UserType.Table)]
        public async Task<ActionResult<String>> CreatePayment(int orderId, CreatePaymentRequest request)
        {
            request.OrderId = orderId;
            var tableid = HttpContext.Items["TableId"] as int?;
            var order = _context.Orders.FirstOrDefault(o => o.Id == orderId);
            if (tableid != null && order != null)
            {
                if (order.TableId != tableid)
                {
                    throw new UnAuthorizedException("Permission denied!");
                }
            }
            var userType = UserType.Staff;

            if(tableid != null)
            {
                userType = UserType.Table;
            }
            return await _vnPayService.CreatePaymentUrl(request, HttpContext,userType);
        }

        [HttpGet("call-back")]
        public async Task CallBack()
        {
            try
            {
                await _vnPayService.PaymentExecute(HttpContext.Request.Query);
                var map = new Dictionary<string, string>();
                map["RspCode"] = "00";
                map["Message"] = "Confirm Success";
                var serializeOptions = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    WriteIndented = true
                };
                await HttpContext.Response.WriteAsync(JsonSerializer.Serialize(map, serializeOptions));
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        [HttpPost("confirm-cash-payment")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff, Common.Enum.UserType.Admin)]
        public async Task<IActionResult> ConfirmPayment(int paymentId)
        {
            await _vnPayService.ConfirmPayment(paymentId);
            return Ok("");
        }

        [HttpGet("get-payment-by-order")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff, Common.Enum.UserType.Admin)]
        public async Task<Pagination<Payment>> Get(int orderId)
        {
            return await _vnPayService.Get(orderId);
        }

        [HttpGet]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin)]
        public async Task<Pagination<Payment>> GetAll([FromQuery] GetAllPaymentRequest request)
        {
            return await _vnPayService.GetAll(request);
        }
    }
}