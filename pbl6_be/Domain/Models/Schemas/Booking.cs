using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models;
using Microsoft.AspNetCore.Mvc.Formatters;
using pbl6_be.Domain.Models;


namespace pbl6_be.Domain.Models.Schemas
{
    [Table("Booking")]
    public class Booking: TableWithIntId
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber {  get; set; }
        public int NumberOfPeople {get; set;}
        public string SpecialRequest  {  get; set; }
        public DateTime OrderDate { get; set; }

        [ForeignKey("table")]
        [Column("table_id", Order = 2)]
        public int TableId { get; set; }
        public virtual Table Table { get; set; }
    }
}
