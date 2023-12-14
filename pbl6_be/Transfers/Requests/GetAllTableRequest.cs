using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Requests
{
    public class GetAllTableRequest
    {
        public TableStatus? CurrentStatus { get; set; }
        public int Limit { get; set; } = 15;
        public int Offset { get; set; } = 0;
    }

    public enum TableStatus
    {
        InUse,
        Free
    }
}