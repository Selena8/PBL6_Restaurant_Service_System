using pbl6_be.Common.Utilities.Exceptions;
using pbl6_be.Domain;
using pbl6_be.Domain.Models;
using AutoMapper;
using pbl6_be.Transfers.DTOs;
using pbl6_be.Common.Utilities;
using pbl6_be.Domain.ModelSetting;
using Microsoft.Extensions.Options;
using static pbl6_be.Common.Enum;
using pbl6_be.Transfers.Responses;
using pbl6_be.Transfers.Requests;
using Microsoft.Extensions.Logging;
using pbl6_be.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Transactions;
using Microsoft.AspNetCore.SignalR;
using pbl6_be.Services.TokenService;
using pbl6_be.Domain.Models.Schemas;

namespace pbl6_be.Services
{
    public partial class UserService : IUserService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;
        private readonly IMailService _mailService;
        private readonly ITokenService _tokenService;
        private readonly AppSettings _appSettings;
        private readonly ILogger<UserService> _logger;
        private readonly IUploadFileService _uploadFileService;
        public UserService(Context context,
            IMailService mailService,
            IMapper mapper,
            ITokenService tokenService,
            IOptions<AppSettings> appSettings,
            ILogger<UserService> logger,
            IUploadFileService uploadFileService
           )
        {
            this._context = context;
            this._mailService = mailService;
            this._mapper = mapper;
            this._tokenService = tokenService;
            this._appSettings = appSettings.Value;
            this._logger = logger;
            this._uploadFileService = uploadFileService;
        }

        public async Task<User> UpdateNewAsync(int id, UpdateNewUserRequest request)
        {
            try
            {
                User user = this.GetById(id);
                if (user == null) throw new BadRequestException($"User with id = {id} not found");
                Assign.Partial(request, user);
                _context.SaveChanges();
                return user;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> SendVerifyEmail(CreateAccountRequest createAccountRequest)
        {
            try
            {
                string email = createAccountRequest.Email;
                if (!CheckUniqueEmail(email))
                    throw new BadRequestException(ConstantErrorMessage.EMAIL_ALREADY_EXIST("en"));
                User user = await CreateNew(email, createAccountRequest.Password, createAccountRequest.UserType);
                SendMailDto mailContent = new SendMailDto();
                string templatePath = Constants.ROOT_PATH_MAIL_TEMPLATE + "/VerifyEmail.html";
                StreamReader str = new StreamReader(templatePath);
                string mailText = str.ReadToEnd();
                str.Close();

                var claims = new List<Claim>();
                claims.AddRange(new[] {
                    new Claim("Id", user.Id.ToString()) ,
                    new Claim("Email", user.Email) ,
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim("TokenType" , TokenType.VerifyEmail.ToString())
                });

                string token = this._tokenService.GenerateAccessToken(claims);
                string confirmUrl = $"{_appSettings.ClientBaseUrl}/registrationConfirm?token={token}";
                mailText = mailText
                    .Replace("[confirm_url]", confirmUrl)
                    .Replace("[user_email]", email);
                mailContent.To = email;
                mailContent.Subject = "Verify email";
                mailContent.Body = mailText;
                return await _mailService.SendConfirmEmail(mailContent);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> ConfirmEmail(string token)
        {
            try
            {
                var userId = _tokenService.ValidateToken(token, TokenType.VerifyEmail);
                if (userId == null)
                    throw new BadRequestException("Invalid or expired token");
                User user = this.GetById((int)userId);
                if (user.AccountStatus == AccountStatus.New)
                {
                    user.AccountStatus = AccountStatus.EmailConfirmed;

                    await _context.SaveChangesAsync();

                }
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<User> CreateNew(string email, string pwd, UserType userType)
        {
            try
            {
                User user = new User();
                user.Email = email;
                user.Password = BCrypt.Net.BCrypt.HashPassword(pwd);
                user.AccountStatus = AccountStatus.New;
                user.RoleId = Convert.ToInt16(userType);
                user.DisplayName = this.RandomDisplayName(user.Email);
                user.Address = "555";
                user.FirstName = "";
                user.LastName = "";
                user.FullName = "";
                user.PhoneNumber = "";
                // user. = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";
                User createdUser = _context.Users.Add(user).Entity;
                await _context.SaveChangesAsync();
                return user;
            }
            catch
            {
                throw;
            }

        }
        public bool CheckUniqueEmail(string email)
        {
            var check = _context.Users.FirstOrDefault(u => u.Email == email);
            return check == null;
        }

        public bool CheckUniqueUsername(string displayName)
        {
            var check = _context.Users.FirstOrDefault(u => u.DisplayName == displayName);
            return check == null;
        }

        public User GetByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public User GetById(int id)
        {
            try
            {
                var user = _context.Users.Include(u => u.Role).FirstOrDefault(u => u.Id == id);
                if (user == null) throw new NotFoundException($"Not found user with id = {id}");
                return user;
            }
            catch
            {
                throw;
            }

        }


        public async Task<bool> ResetPassword(ResetPasswordRequest request)
        {
            _logger.LogInformation("--- Start ResetPassWord with request = {@request}  ", request);
            var userId = _tokenService.ValidateToken(request.Token, TokenType.ForgotEmail);
            try
            {
                if (userId == null) throw new BadRequestException("Invalid token");

                var user = this.GetById(userId.Value);
                if (BCrypt.Net.BCrypt.Verify(request.NewPassword, user.Password)) throw new BadRequestException("Old PassWord");

                user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);

                await _context.SaveChangesAsync();
                _logger.LogInformation("ResetPassWord UserId {@Id} with request = {@request} Successed  ", userId, request);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError("ResetPassWord UserId = {@Id} with request = {@request}  failed. Error = {Message}", userId, request, ex.Message);
                throw;
            }

        }

        public async Task<bool> SendForgotPassword(string email)
        {
            try
            {
                var user = this.GetByEmail(email);
                if (user == null) throw new BadRequestException("Email does not exits");
                if (user.AccountStatus == AccountStatus.New || user.AccountStatus == AccountStatus.InActive) throw new BadRequestException("Unconfirmed email or account has been locked");
                var mailContent = new SendMailDto();
                string templatePath = Constants.ROOT_PATH_MAIL_TEMPLATE + "/ForgotPassword.html";
                var str = new StreamReader(templatePath);
                string mailText = str.ReadToEnd();
                str.Close();

                var claims = new List<Claim>();
                claims.AddRange(new[] {
                    new Claim("Id", user.Id.ToString()) ,
                    new Claim("Email", user.Email) ,
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim("TokenType" , TokenType.ForgotEmail.ToString())
                });

                string token = this._tokenService.GenerateAccessToken(claims);
                string resetPass = $"{_appSettings.ClientBaseUrl}/user/forgot_password?token={token}";
                mailText = mailText
                    .Replace("[resetPass_url]", resetPass)
                    .Replace("[name]", user.FirstName);
                mailContent.To = email;
                mailContent.Subject = "Forgot password";
                mailContent.Body = mailText;
                return await _mailService.SendConfirmEmail(mailContent);
            }
            catch
            {
                throw;
            }
        }

        public async Task<UserResponse> Profile(User user)
        {
            try
            {
                var currentUser = await _context.Users
                .FirstOrDefaultAsync(x => x.Id == user.Id);
                if (user == null) throw new NotFoundException("User with id = {0} not found", user.Id);
                var response = _mapper.Map<UserResponse>(user);
                return response;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> ChangePassword(int id, ChangePasswordRequest request)
        {
            try
            {
                if (request.OldPassword == request.NewPassword) throw new BadRequestException(ConstantErrorMessage.ENTERED_OLD_PASSWORD("en"));
                var user = this.GetById(id);
                if (!BCrypt.Net.BCrypt.Verify(request.OldPassword, user.Password)) throw new BadRequestException(ConstantErrorMessage.INVALID_OLD_PASSWORD("en"));
                user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> ResendConfirmEmail(string email)
        {
            try
            {
                SendMailDto mailContent = new SendMailDto();
                string templatePath = Constants.ROOT_PATH_MAIL_TEMPLATE + "/VerifyEmail.html";
                StreamReader str = new StreamReader(templatePath);
                string mailText = str.ReadToEnd();
                str.Close();
                User user = _context.Users.FirstOrDefault(x => x.Email == email);
                if (user == null) throw new BadRequestException("Account is not Exist");

                var claims = new List<Claim>();
                claims.AddRange(new[] {
                    new Claim("Id", user.Id.ToString()) ,
                    new Claim("Email", user.Email) ,
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim("TokenType" , TokenType.VerifyEmail.ToString())
                });

                string token = this._tokenService.GenerateAccessToken(claims);
                string confirmUrl = $"{_appSettings.ClientBaseUrl}/registrationConfirm?token={token}";
                mailText = mailText
                    .Replace("[confirm_url]", confirmUrl)
                    .Replace("[client_host]", _appSettings.ClientBaseUrl)
                    .Replace("[user_email]", email);
                mailContent.To = email;
                mailContent.Subject = "Verify Email";
                mailContent.Body = mailText;
                return await _mailService.SendConfirmEmail(mailContent);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> SetAvatar(int id, IFormFile avatar)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) throw new BadRequestException("Account is not Exist");

            user.Avatar = (await _uploadFileService.UploadFile(new UploadFileDto() { File = avatar })).Url;
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
