using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;

namespace pbl6_be.Transfers.Requests
{
    public class GetAllPaymentRequest
    {
        public int? OrderId { get; set; }
        public DateTime StartDate { get; set; } = DateTime.MinValue;
        public DateTime EndDate { get; set; } = DateTime.MaxValue;
        public PaymentType? Type { get; set; }
        public PaymentStatus? Status { get; set; }
        public int Limit { get; set; } = 15;
        public int Offset { get; set; } = 0;
    }
}