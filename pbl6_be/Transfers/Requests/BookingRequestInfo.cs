using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Requests
{
    public class BookingRequestInfo
    {
        public string FullName { get; set; }

        [EmailAddress]
        public string Email { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;

        public DateTime OrderDate { get; set; }
        [Required]
        public int NumberOfPeople { get; set; }
        public string SpecialRequest { get; set; } = null!;
    }
}