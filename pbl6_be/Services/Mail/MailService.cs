using pbl6_be.Transfers.DTOs;
using pbl6_be.Domain.ModelSetting;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace pbl6_be.Services
{
    public class MailService : IMailService
    {
        private readonly MailSettings mailSettings;
        public MailService(IOptions<MailSettings> _mailSettings)
        {
            mailSettings = _mailSettings.Value;
        }

        public async Task<bool> SendConfirmEmail(SendMailDto sendMailDto)
        {
            var email = new MimeMessage();
            email.Sender = new MailboxAddress(mailSettings.DisplayName, mailSettings.Mail);
            email.From.Add(new MailboxAddress(mailSettings.DisplayName, mailSettings.Mail));
            email.To.Add(MailboxAddress.Parse(sendMailDto.To));
            email.Subject = sendMailDto.Subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = sendMailDto.Body;
            email.Body = builder.ToMessageBody();
            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            try
            {
                smtp.Connect(mailSettings.Host, mailSettings.Port, SecureSocketOptions.StartTls);
                smtp.Authenticate(mailSettings.Mail, mailSettings.Password);
                await smtp.SendAsync(email);
            }
            catch (Exception)
            {
                smtp.Disconnect(true);
                throw;
                return false;
            }
            smtp.Disconnect(true);
            return true;
        }
    }
}
