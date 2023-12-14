using pbl6_be.Transfers.DTOs;

namespace pbl6_be.Services
{
    public interface IMailService
    {
        Task<bool> SendConfirmEmail(SendMailDto sendMailDto);
    }
}
