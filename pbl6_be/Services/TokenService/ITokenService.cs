using System.Security.Claims;
using pbl6_be.Domain.Models;
using pbl6_be.Domain.Models.Schemas;

namespace pbl6_be.Services.TokenService
{
    public interface ITokenService
    {
        string GenerateAccessToken(IEnumerable<Claim> claims);
        string GenerateJwtToken(User user, int expireHours = 24);
        int? ValidateToken(string token, TokenType type = TokenType.Login);
        int? ValidateTableToken(string token);
    }
}