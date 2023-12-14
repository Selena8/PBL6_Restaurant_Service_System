using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Requests
{
    public class UpdateTableRequest
    {
        public string Name { get; set; }
        public int NumberOfSeats { get; set; }
        public string TableName { get; set; }
        public string? Password { get; set; }
    }
}