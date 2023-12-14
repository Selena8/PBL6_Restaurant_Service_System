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
    [Table("order_detail")]
    public class OrderDetail : TableWithIntId
    {
        [Column("status")]
        public OrderDetailStatus Status { get; set; }

        [Column("quantity")]
        public int Quantity { get; set; }

        [ForeignKey("food")]
        [Column("food_id", Order = 2)]
        public int FoodId { get; set; }

        [ForeignKey("order")]
        [Column("order_id", Order = 3)]
        public int OrderId { get; set; }

        public virtual Food Food { get; set; }
        public virtual Order Order { get; set; }
    }
}