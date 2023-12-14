using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Domain.Models;
using pbl6_be.Domain.Models.Schemas;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Transfers.Responses
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public AccountStatus AccountStatus { get; set; }
        public DateTime? DayOfBirth { get; set; }
        public Gender Gender { get; set; }
        public string PhoneNumber { get; set; }
        public int UserType { get; set; }
        public string Address { get; set; }
        public string Token { get; set; }
        public AuthenticateResponse(User user, string AccessToken)
        {
            Id = user.Id;
            Email = user.Email;
            DisplayName = user.DisplayName;
            FirstName = user.FirstName;
            LastName = user.LastName;
            FullName = user.FullName;
            AccountStatus = user.AccountStatus;
            DayOfBirth = user.DayOfBirth;
            Gender = user.Gender;
            PhoneNumber = user.PhoneNumber;
            UserType = user.Role.Id;
            Address = user.Address;
            Token = AccessToken;
        }
    }
}