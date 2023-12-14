using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models;
using pbl6_be.Domain.Models;

namespace pbl6_be.Domain.Models.Schemas
{
    [Table("work_log")]
    public class WorkLog : TableWithIntId
    {
        [Column("check_in_time")]
        public DateTime CheckInTime { get; set; } = DateTime.MinValue;

        [Column("check_out_time")]
        public DateTime CheckOutTime { get; set; } = DateTime.MaxValue;

        [Column("mac_address")]
        [StringLength(50)]
        public string MacAddress { get; set; } = null!;

        [Column("total_time")]
        public double TotalTime { get; set; }

        [ForeignKey("user")]
        [Column("user_id", Order = 2)]
        public int UserId { get; set; }
        
        [ForeignKey("shift")]
        [Column("shift_id", Order = 3)]
        public int ShiftId { get; set; }

        public virtual User User { get; set; }
        public virtual Shift Shift { get; set; }
    }
}