using System.ComponentModel.DataAnnotations;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Transfers.Requests
{
    public class UpdateNewUserRequest
    {
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [DataType(DataType.Date)]
        public DateTime? DayOfBirth { get; set; } = null;
        [Phone]
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public Gender Gender { get; set; }
    }
}
