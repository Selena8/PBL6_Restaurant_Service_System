using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using pbl6_be.Domain.Models;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Domain.ModelSettings;

namespace pbl6_be.Services.TokenService
{
    public enum TokenType
    {
        VerifyEmail,
        ForgotEmail,
        Login
    }

    public class TokenService : ITokenService
    {
        private readonly IOptionsMonitor<JwtBearerOptions> _jwtOptions;
        private readonly TokenSettings _tokenSettings;

        public TokenService(IOptions<TokenSettings> tokenSettings,
            IOptionsMonitor<JwtBearerOptions> jwtOptions)
        {
            _tokenSettings = tokenSettings.Value;
            _jwtOptions = jwtOptions;
        }

        public string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenSettings.Key));
            var signinCredentials = new SigningCredentials(secretKey, _tokenSettings.signinCredentials);

            var tokeOptions = new JwtSecurityToken(
                issuer: _tokenSettings.Issuer,
                audience: _tokenSettings.Audience,
                claims: claims,
                expires: DateTime.Now.AddHours(Convert.ToInt16(_tokenSettings.AccessTokenExpirationHours)),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;
        }

        public int? ValidateToken(string token, TokenType type = TokenType.Login)
        {
            try
            {
                if (string.IsNullOrEmpty(token))
                {
                    return null;
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_tokenSettings.Key);
                var tokenValidationParameters = _jwtOptions.Get(JwtBearerDefaults.AuthenticationScheme).TokenValidationParameters;
                tokenHandler.ValidateToken(token,
                    tokenValidationParameters
                , out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "Id").Value);

                var typeInToken = jwtToken.Claims.First(x => x.Type == "TokenType").Value;
                if (typeInToken == null) 
                {
                    throw new Exception("Token is not valid");
                }
                else 
                {
                    if((TokenType)Enum.Parse(typeof(TokenType), typeInToken.ToString()) != type) throw new Exception("Token is not valid");
                }
                return userId;
            }
            catch
            {
                throw;
                return null;
            }
        }

        public int? ValidateTableToken(string token)
        {
            try
            {
                if (string.IsNullOrEmpty(token))
                {
                    return null;
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_tokenSettings.Key);
                var tokenValidationParameters = _jwtOptions.Get(JwtBearerDefaults.AuthenticationScheme).TokenValidationParameters;
                tokenHandler.ValidateToken(token,
                    tokenValidationParameters
                , out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "Id").Value);
                var IsTableToken = jwtToken.Claims.FirstOrDefault(x => x.Type == "IsTableToken")?.Value;
                if (IsTableToken == null) return null;

                return userId;
            }
            catch
            {
                throw;
                return null;
            }
        }

        public string GenerateJwtToken(User user, int expireHours = 24)
        {
            try
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenSettings.Key));
                var signinCredentials = new SigningCredentials(secretKey, _tokenSettings.signinCredentials);
                var claims = new List<Claim>();
                claims.AddRange(new[] {
                    new Claim("Id", user.Id.ToString()) ,
                    new Claim("Email", user.Email) ,
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())

                });

                var tokeOptions = new JwtSecurityToken(
                    issuer: _tokenSettings.Issuer,
                    audience: _tokenSettings.Audience,
                    claims: claims,
                    expires: DateTime.Now.AddHours(expireHours),
                    signingCredentials: signinCredentials
                );
                return new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            }
            catch
            {
                throw;
            }
        }
    }
}
