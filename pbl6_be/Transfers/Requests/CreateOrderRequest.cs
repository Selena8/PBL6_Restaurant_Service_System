using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Requests
{
    public class CreateOrderRequest
    {
        [Required]
        public int TableId {get; set;}
    }
}