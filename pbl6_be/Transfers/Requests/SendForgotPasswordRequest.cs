using System.ComponentModel.DataAnnotations;

namespace pbl6_be.Transfers.Requests
{
    public class SendForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
