using pbl6_be.Domain.Models;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Transfers.Responses
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public AccountStatus AccountStatus { get; set; }
        public DateTime? DayOfBirth { get; set;} 
        public string PhoneNumber { get; set; }
        public UserType UserType { get; set; }
        public string Address { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
        public string Avatar { get; set; }
        public Gender Gender { get; set; }
    }
}
