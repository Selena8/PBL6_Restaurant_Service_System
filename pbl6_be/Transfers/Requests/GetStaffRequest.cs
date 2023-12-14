using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Transfers.Requests
{
    public class GetStaffRequest
    {
        public AccountStatus? AccountStatus { get; set; }
        public UserFilter? UserType { get; set; }
        public int Limit { get; set; } = 15;
        public int Offset { get; set; } = 0;
        public string Search { get; set; } = "";
        public SearchBy SearchBy { get; set; }
        public SortBy SortBy { get; set; } = SortBy.Id;
        public string Direction { get; set; } = "DESC";
    }

    public enum SearchBy
    {
        Id,
        Name,
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        None,
    }

    public enum SortBy
    {
        Id,
    }

    public enum UserFilter 
    {
        [Display(Name = "Admin")]
        Admin = 1,
        [Display(Name = "Staff")]
        Staff = 2,
    }
}