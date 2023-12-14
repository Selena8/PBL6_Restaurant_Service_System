using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;

namespace pbl6_be.Transfers.Requests
{
    public class CreatePaymentRequest
    {
        public int OrderId {get; set;}
        public PaymentType Type {get; set;}
    }
}