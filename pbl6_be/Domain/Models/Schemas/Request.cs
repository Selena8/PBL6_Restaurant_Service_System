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
    [Table("request")]
    public class Request : TableWithIntId
    {
        [Column("type")]
        public RequestType Type { get; set; }
        
        [Column("status")]
        public RequestStatus Status { get; set; }
        
        [Column("description")]
        [StringLength(300)]
        public string Description { get; set; } = null!;
        [Column("request_time")]
        public DateTime RequestTime { get; set; }
        [Column("rank")]
        public int Rank { get; set; }
        [ForeignKey("userhandled")]
        [Column("user_id", Order = 2)]
        public int UserId { get; set; }

        [ForeignKey("table")]
        [Column("table_id", Order = 3)]
        public int TableId { get; set; }
        public virtual Table Table { get; set; }
        public virtual User UserHandled { get; set; }
    }
}