using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;

namespace pbl6_be.Transfers.Responses
{
    public class GetRequestTableResponse
    {
        public int Id { get; set; }
        public int TableId { get; set; }
        public string TableName {get; set;}
        public string Description { get; set; }
        public RequestStatus Status { get; set; }
        public RequestType Type { get; set; }
        public DateTime RequestTime { get; set; }
    }
}