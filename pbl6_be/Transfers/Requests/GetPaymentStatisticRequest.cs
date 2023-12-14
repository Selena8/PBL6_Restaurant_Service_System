using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Requests
{
    public class GetPaymentStatisticRequest
    {
        public DateTime StartDate { get; set; } = DateTime.MinValue;
        public DateTime EndDate { get; set; } = DateTime.MaxValue;
    }
}