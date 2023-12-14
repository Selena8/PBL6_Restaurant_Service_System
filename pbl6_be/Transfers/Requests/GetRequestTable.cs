using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;

namespace pbl6_be.Transfers.Requests
{
    public class GetRequestTable
    {
        public RequestStatus RequestStatus { get; set; }
        public int TableId { get; set; }
        public int Limit { get; set; } = 5;
        public int Offset { get; set; } = 0;
        public string SortBy { get; set; } = "Id";
        public string Direction { get; set; } = "ASC";
    }
}