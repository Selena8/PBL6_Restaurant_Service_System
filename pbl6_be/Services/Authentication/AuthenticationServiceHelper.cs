using System.Security.Claims;
using pbl6_be.Domain.Models;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Services.TokenService;

namespace pbl6_be.Services.Authentication
{
    public partial class AuthenticationService
    {
        private string GenerateLoginToken(User user)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim("Id", user.Id.ToString()));
            claims.Add(new Claim("Email", user.Email));
            claims.Add(new Claim(ClaimTypes.Role, user.Role.Name));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Name, user.Id.ToString()));
            claims.Add(new Claim("AccountStatus", user.AccountStatus.ToString()));
            claims.Add(new Claim("TokenType", TokenType.Login.ToString()));
            return _tokenService.GenerateAccessToken(claims);
        }

        private string GenerateLoginTokenForTable(Table table)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim("Id", table.Id.ToString()));
            claims.Add(new Claim("TableName", table.TableName));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, table.Id.ToString()));
            claims.Add(new Claim("IsTableToken" , true.ToString()));
            return _tokenService.GenerateAccessToken(claims);
        }
    }
}