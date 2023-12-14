using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Domain.Models.Schemas;

namespace pbl6_be.Transfers.Responses
{
    public class ShiftResponse
    {
        public int Id {get; set;}
        public DateTime WorkDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public ShiftStatus Status { get; set; }
        public int UserId { get; set; }
        public string StaffName {get; set;}
        public WorkLog WorkLog { get; set; }
    }
}