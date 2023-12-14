using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;

namespace pbl6_be.Transfers.Requests
{
    public class GetAllOrderRequest
    {
        public int? TableId { get; set; } = null;
        public OrderStatus? OrderStatus { get; set; } = null;
        public DateTime? OrderTime { get; set; } = null;
        public int Limit { get; set; } = 15;
        public int Offset { get; set; } = 0;
        public string Search { get; set; } = "";
        public OrderSearchBy? SearchBy {get; set;}
        public OrderSortBy SortBy { get; set; } = OrderSortBy.Id;
        public string Direction { get; set; } = "DESC";
    }

    public enum OrderSearchBy
    {
        Id,
        TableName,
        None
    }

    public enum OrderSortBy
    {
        Id,
        OrderTime,
    }
}