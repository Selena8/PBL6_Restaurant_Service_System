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
    [Table("shift")]
    public class Shift : TableWithIntId
    {
        [Column("work_date")]
        public DateTime WorkDate { get; set; }
        [Column("start_time")]
        public DateTime StartTime { get; set; }
        [Column("end_time")]
        public DateTime EndTime { get; set; }
        [Column("status")]
        public ShiftStatus Status { get; set; }

        [ForeignKey("user")]
        [Column("user_id", Order = 3)]
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public virtual WorkLog WorkLog { get; set; }
        public ICollection<RequestToChangeWorklog> Requests { get; set; }

        public Shift()
        {
            Requests = new HashSet<RequestToChangeWorklog>();
        }
    }

    public enum ShiftStatus
    {
        New,
        Worked,
        Cancel,
    }
}