using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Services;
using pbl6_be.Services.TokenService;

namespace pbl6_be.Api.Middlewares
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IUserService userService, ITokenService tokenService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                AttachUserToContext(context, userService, tokenService, token);
            await _next(context);
        }

        private void AttachUserToContext(HttpContext context, IUserService userService, ITokenService tokenService, string token)
        {
            try
            {
                if (tokenService.ValidateTableToken(token) != null)
                {
                    context.Items["TableId"] = tokenService.ValidateTableToken(token);
                    return;
                }
                var userId = tokenService.ValidateToken(token);
                if (userId != null)
                {
                    var user = userService.GetById(userId.Value);
                    context.Items["User"] = user;
                    context.Items["AccountStatus"] = user.AccountStatus;
                }
            }
            catch (Exception ex)
            {
                // throw new Exception("Token Invalid or Expire");
            }
        }
    }
}