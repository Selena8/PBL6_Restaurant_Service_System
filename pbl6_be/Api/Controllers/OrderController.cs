using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;
using Microsoft.AspNetCore.Mvc;
using pbl6_be.Common.Utilities.Exceptions;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Services;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Api.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            this._orderService = orderService;
        }

        [HttpGet("{orderId}")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin, Common.Enum.UserType.Staff)]
        public async Task<ActionResult<OrderResponse>> Get(int orderId)
        {

            return await this._orderService.Get(orderId);
        }

        [HttpGet("get-order-by-table")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Table)]
        public async Task<ActionResult<OrderResponse>> GetByTable()
        {
            var tableid = (int)HttpContext.Items["TableId"];
            return await this._orderService.GetByTable(tableid);
        }

        [HttpGet]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin, Common.Enum.UserType.Staff)]
        public async Task<ActionResult<Pagination<OrderResponse>>> GetAll([FromQuery] GetAllOrderRequest request)
        {
            var user = HttpContext.Items["User"] as User;
            var usertype = (UserType)user.RoleId;
            return await this._orderService.GetAll(usertype, request);
        }

        [HttpPost]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Table, Common.Enum.UserType.Staff, Common.Enum.UserType.Admin)]
        public async Task<ActionResult<OrderResponse>> Create(CreateOrderRequest request)
        {
            var tableid = HttpContext.Items["TableId"] as int?;
            if(tableid != null)
            {
                if(request.TableId != tableid)
                {
                    throw new BadRequestException("TableId is not valid");
                }
            }
            return await this._orderService.CreateOrder(request);
        }

        // [HttpPut("{orderId}/update-status-order")]
        // [Authorize]
        // [UserTypeFilter(Common.Enum.UserType.Staff, Common.Enum.UserType.Admin)]
        // public async Task<ActionResult<Boolean>> UpdateStatusOrder(int orderId,[FromForm]OrderStatus newstatus)
        // {
        //     return await this._orderService.UpdateStatusOrder(orderId, newstatus);
        // }

        [HttpPut("{orderId}/{orderDetailId}/update-status-order")]
        [UserTypeFilter(Common.Enum.UserType.Staff, Common.Enum.UserType.Admin,Common.Enum.UserType.Table)]
        public async Task<ActionResult<Boolean>> UpdateStatusOrderDetail([FromRoute] int orderId, [FromRoute] int orderDetailId,[FromForm]OrderDetailStatus newstatus)
        {
            var tableid = HttpContext.Items["TableId"] as int?;
            return await this._orderService.UpdateStatusOrderDetail(orderId, orderDetailId,tableid, newstatus);
        }

        [HttpPut("{orderId}/order-food")]
        [UserTypeFilter(Common.Enum.UserType.Staff, Common.Enum.UserType.Admin,Common.Enum.UserType.Table)]
        public async Task<ActionResult<OrderResponse>> Order([FromRoute] int orderId, OrderRequest request)
        {
            var tableid = HttpContext.Items["TableId"] as int?;
            return await this._orderService.Order(request, orderId,tableid);
        }
    }
}