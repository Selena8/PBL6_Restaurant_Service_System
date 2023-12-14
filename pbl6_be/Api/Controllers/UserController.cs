using AutoMapper;
using pbl6_be.Services;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using pbl6_be.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using static pbl6_be.Common.Enum;
using pbl6_be.Domain.Models.Schemas;

namespace Trouble_Resolving_SystemBackEnd.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("me")]
        [Authorize]
        public async Task<ActionResult<UserResponse>> GetProfile()
        {
            var user = HttpContext.Items["User"] as User;
            var result = await _userService.Profile(user);
            return Ok(result);
        }

        // [HttpPost]
        // [Route("send/verify-email")]
        // public async Task<IActionResult> SendMail(CreateAccountRequest request)
        // {
        //     var success = await _userService.SendVerifyEmail(request);
        //     return Ok(success);
        // }

        [HttpPost]
        [Route("verify-email")]
        public async Task<IActionResult> ConfirmEmail(string token)
        {
            var success = await _userService.ConfirmEmail(token);
            return Ok(success);
        }

        [HttpPut("me")]
        [Authorize]
        [UserTypeFilter(UserType.Staff, UserType.Admin)]
        public async Task<ActionResult<User>> UpdateMe(UpdateNewUserRequest request)
        {
            User user = HttpContext.Items["User"] as User;
            User response = await _userService.UpdateNewAsync(user.Id, request);
            return Ok(response);
        }



        [HttpPost("reset-password")]
        public async Task<ActionResult<bool>> ResetPassword(ResetPasswordRequest request)
        {
            return await _userService.ResetPassword(request);
        }

        [HttpPost("send/forgot-password")]
        public async Task<ActionResult<bool>> ForgotPassword(SendForgotPasswordRequest request)
        {
            return await _userService.SendForgotPassword(request.Email);
        }

        [HttpPost("change-password")]
        [Authorize]
        [UserTypeFilter(UserType.Staff, UserType.Admin)]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequest request)
        {
            var user = HttpContext.Items["User"] as User;
            var result = await _userService.ChangePassword(user.Id, request);
            return Ok(result);
        }

        [HttpPost("resend-confirm-mail")]
        public async Task<IActionResult> ResendCofirmEmail(string email)
        {
            var result = await _userService.ResendConfirmEmail(email);
            return Ok(result);
        }

        [HttpPut("me/set-avatar")]
        [Authorize]
        [UserTypeFilter(UserType.Staff, UserType.Admin)]
        public async Task<IActionResult> SetAvatar(IFormFile avatar)
        {
            var user = HttpContext.Items["User"] as User;
            var result = await _userService.SetAvatar(user.Id,avatar);
            return Ok(result);
        }
    }
}
