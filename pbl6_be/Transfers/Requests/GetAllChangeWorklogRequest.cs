using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Domain.Models.Schemas;

namespace pbl6_be.Transfers.Requests
{
    public class GetAllChangeWorklogRequest
    {
        public DateTime StartDate {get; set;} = DateTime.MinValue;
        public DateTime EndDate {get; set;} = DateTime.MaxValue;
        public RequestToChangeWorklogStatus? Status { get; set; }
        public int? UserId {get; set;}
        public int Limit { get; set; } = 15;
        public int Offset { get; set; } = 0;
    }
}