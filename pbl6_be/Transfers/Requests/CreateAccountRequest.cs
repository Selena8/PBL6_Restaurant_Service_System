using System.ComponentModel.DataAnnotations;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Transfers.Requests
{
    public class CreateAccountRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [Range(1, 2)]
        public UserType UserType { get; set; }
    }
}
