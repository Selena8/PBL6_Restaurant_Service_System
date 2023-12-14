using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Domain.Models.Schemas;

namespace pbl6_be.Transfers.Responses
{
    public class RequestToChangeWorklogResponse
    {
        public int Id {get; set;}
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public RequestToChangeWorklogStatus Status { get; set; }
        public string Description {get; set;}
        public int ShiftId { get; set; }
        public string StaffName { get; set; }
    }
}