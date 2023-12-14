using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Transfers.Requests
{
    public class CreateStaffRequest
    {
        public string Email { get; set; }
        public DateTime? DayOfBirth { get; set; }
        public Gender Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [EnumDataType(typeof(UserTypeAddStaff))]
        public UserTypeAddStaff UserType { get; set; }
    }
    public enum UserTypeAddStaff
    {
        [Display(Name = "Admin")]
        Admin = 1,
        [Display(Name = "Staff")]
        Staff = 2,
    }
}