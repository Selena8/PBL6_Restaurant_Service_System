using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using pbl6_be.Domain.Models;
using static pbl6_be.Common.Enum;
using pbl6_be.Domain.Models.Schemas;

namespace pbl6_be.Services
{
    public interface IUserService
    {
        Task<User> UpdateNewAsync(int id, UpdateNewUserRequest request);
        Task<UserResponse> Profile(User user);
        User GetByEmail(string email);
        User GetById(int id);
        Task<bool> SendVerifyEmail(CreateAccountRequest createAccountRequest);
        Task<User> CreateNew(string email, string pwd, UserType usertype);
        Task<bool> ConfirmEmail(string token);
        Task<bool> ResetPassword(ResetPasswordRequest request);
        Task<bool> SendForgotPassword(string email);
        Task<bool> ChangePassword(int id, ChangePasswordRequest request);
        Task<bool> ResendConfirmEmail(string email);
        Task<bool> SetAvatar(int id , IFormFile avatar);
    }
}
