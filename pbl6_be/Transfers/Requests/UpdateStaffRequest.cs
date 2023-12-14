using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Transfers.Requests
{
    public class UpdateStaffRequest
    {
        public DateTime? DayOfBirth { get; set; }
        public Gender Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string? Avatar { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public AccountStatus AccountStatus { get; set; }
        public UserTypeAddStaff UserType { get; set; }
    }
}