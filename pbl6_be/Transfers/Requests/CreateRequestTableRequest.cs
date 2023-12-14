using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;

namespace pbl6_be.Transfers
{
    public class CreateRequestTableRequest
    {
        public RequestType Type { get; set; }
        public string Description { get; set; }
    }
}