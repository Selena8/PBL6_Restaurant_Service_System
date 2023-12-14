using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;
using Domain.Models;

namespace pbl6_be.Domain.Models.Schemas
{
    [Table("payment")]
    public class Payment : TableWithIntId
    {
        [Column("payment_date")]
        public DateTime PaymentDate { get; set; }

        [Column("type")]
        public PaymentType Type { get; set; }

        [Column("total_amount")]
        public decimal TotalAmount { get; set; }

        [Column("status")]
        public PaymentStatus Status { get; set; }

        [ForeignKey("order")]
        [Column("order_id", Order = 2)]
        public int OrderId { get; set; }

        public virtual Order Order { get; set; }

    }
}