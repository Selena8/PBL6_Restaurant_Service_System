
using pbl6_be.Domain.Models;
using static pbl6_be.Common.Enum;
using pbl6_be.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using pbl6_be.Transfers.DTOs;

namespace pbl6_be.Services
{
    public partial class UserService
    {
        public string RandomDisplayName(string email)
        {
            const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            var random = new Random();
            var code = new string(Enumerable.Repeat(chars, 4)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            while (_context.Users.IgnoreQueryFilters().Any(u => u.DisplayName == $"{email.Substring(0, 6)}_{code}"))
            {
                code = new string(Enumerable.Repeat(chars, 4)
                .Select(s => s[random.Next(s.Length)]).ToArray());
            }
            return $"{email.Substring(0, 6)}_{code}";
        }

    }
}
