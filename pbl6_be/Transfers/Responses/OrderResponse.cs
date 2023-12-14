using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;

namespace pbl6_be.Transfers.Responses
{
    public class OrderResponse
    {
        public int Id { get; set; }
        
        public DateTime OrderTime { get; set; }

        public OrderStatus OrderStatus { get; set; }

        public int UserId { get; set; }
        
        public int TableId { get; set; } 
        public string TableName {get; set;}
        public List<OrderDetailResponse> Orderedfoods{get; set;}
        public double Total {get; set;}
        public PaymentType? PaymentType {get; set;} 

        public OrderResponse()
        {
            Orderedfoods = new List<OrderDetailResponse>();
        }
    }

    public class OrderDetailResponse
    {
        public int OrderDetailId {get; set;}
        public OrderDetailStatus OrderStatus { get; set; }

        public int Quantity { get; set; }

        public int FoodId { get; set; }
    }
}
