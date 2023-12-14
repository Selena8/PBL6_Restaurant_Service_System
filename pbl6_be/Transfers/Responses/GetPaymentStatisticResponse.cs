using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Responses
{
    public class GetPaymentStatisticResponse
    {
        public int SuccessOnlinePayment { get; set; }
        public int SuccessCashPayment { get; set; }
        public int FailOnlinePayment { get; set; }
        public int FailCashPayment { get; set; }
        public int OnlinePaymentTotal { get; set; }
        public int CashPaymentTotal { get; set; }
    }
}