using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using pbl6_be.Services;
using pbl6_be.Services.Authentication;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Api.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IUploadFileService _uploadFileService;
        public AuthController(IAuthenticationService authenticationService,IUploadFileService uploadFileService)
        {
            _authenticationService = authenticationService;
            _uploadFileService = uploadFileService;
        }

        [HttpPost, Microsoft.AspNetCore.Mvc.Route("login")]
        public async Task<ActionResult<AuthenticateResponse>> Login(AuthenticateRequest loginRequest)
        {
            var response = await _authenticationService.Login(loginRequest, "ja");
            return Ok(response);
        }

        [HttpPost, Microsoft.AspNetCore.Mvc.Route("login-table")]
        public async Task<ActionResult<AuthenticateResponse>> LoginTable(AuthenticateRequest loginRequest)
        {
            var response = await _authenticationService.LoginTable(loginRequest, "ja");
            return Ok(response);
        }

        // [HttpPost, Microsoft.AspNetCore.Mvc.Route("test-api")]
        // public async Task<IActionResult> Test()
        // {
        //     return Ok("123");
        // }
    }
}
