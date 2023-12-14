using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;

namespace pbl6_be.Services.Authentication
{
    public interface IAuthenticationService
    {
        Task<AuthenticateResponse> Login(AuthenticateRequest request, string language);
        Task<string> LoginTable(AuthenticateRequest request, string language);
    }
}