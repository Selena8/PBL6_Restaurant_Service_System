using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;
using Domain.Models;
using pbl6_be.Domain.Models;

namespace pbl6_be.Domain.Models.Schemas
{
    [Table("order")]
    public class Order : TableWithIntId
    {
        [Column("order_time")]
        public DateTime OrderTime { get; set; }

        [Column("order_status")]
        public OrderStatus OrderStatus { get; set; }

        [ForeignKey("user")]
        [Column("user_id", Order = 2)]
        public int UserId { get; set; }
        
        [ForeignKey("table")]
        [Column("table_id", Order = 3)]
        public int TableId { get; set; }

        public virtual Table Table { get; set; }
        public virtual User User { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public ICollection<Payment> Payments { get; set; }

        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
            Payments = new HashSet<Payment>();
        }
    }
}