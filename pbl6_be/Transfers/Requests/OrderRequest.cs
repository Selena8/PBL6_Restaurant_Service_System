using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Requests
{
    public class OrderRequest
    {
        public List<OrderDetailRequest> Orders {get; set;}
        public OrderRequest()
        {
            Orders = new List<OrderDetailRequest>();
        }
    }

    public class OrderDetailRequest
    {
        public int OrderDetailId { get; set; }
        public int FoodId { get; set; }
        public int Quantity { get; set; }
    }
}