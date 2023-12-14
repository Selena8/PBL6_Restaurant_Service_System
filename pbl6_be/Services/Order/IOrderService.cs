using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using static pbl6_be.Common.Enum;
namespace pbl6_be.Services
{
    public interface IOrderService
    {
        Task<OrderResponse> CreateOrder(CreateOrderRequest request);
        Task<OrderResponse> Get(int orderId);
        Task<OrderResponse> GetByTable(int tableid);
        Task<Pagination<OrderResponse>> GetAll(UserType usertype, GetAllOrderRequest request);
        Task<OrderResponse> Order(OrderRequest request,int orderId, int? tableid);
        Task<Boolean> UpdateStatusOrder(int orderId, OrderStatus newStatus);
        Task<Boolean> UpdateStatusOrderDetail(int orderId,int orderDetailId,int? tableid, OrderDetailStatus newStatus);
    }
}