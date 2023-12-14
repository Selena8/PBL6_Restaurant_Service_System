using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models;
using pbl6_be.Domain.Models;

namespace pbl6_be.Domain.Models.Schemas
{
    [Table("table")]
    public class Table: TableWithIntId
    {
        public string Name { get; set; }
        public int NumberOfSeats { get; set; }
        public bool CurrentState {  get; set; }
        public String TableName { get; set; }
        public string Password { get; set; }
        public ICollection<Booking> Bookings { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Request> Requests { get; set; }
        public Table()
        {
            Bookings = new HashSet<Booking>();
            Orders = new HashSet<Order>();
            Requests = new HashSet<Request>();
        }

    }
}
