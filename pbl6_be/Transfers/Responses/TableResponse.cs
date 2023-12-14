using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Transfers.Requests;

namespace pbl6_be.Transfers.Responses
{
    public class TableResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int NumberOfSeats { get; set; }
        public TableStatus CurrentStatus { get; set; }
        public string TableName { get; set; }
        public List<Booking> Bookings { get; set; }
    }
}