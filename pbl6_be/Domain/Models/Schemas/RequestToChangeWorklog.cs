using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models;

namespace pbl6_be.Domain.Models.Schemas
{
    [Table("requestchangeworklog")]
    public class RequestToChangeWorklog : TableWithIntId
    {
        [Column("new_start_time")]
        public DateTime StartTime { get; set; }
        [Column("new_end_time")]
        public DateTime EndTime { get; set; }
        [Column("status")]
        public RequestToChangeWorklogStatus Status {get; set;}
        [Column("description")]
        public string Description {get; set;}
        [ForeignKey("Shift")]
        [Column("shift_id")]
        public int ShiftId { get; set; }
        public virtual Shift Shift { get; set; }
    }

    public enum RequestToChangeWorklogStatus
    {
        Inprogress,
        Done,
        Reject,
    }
}