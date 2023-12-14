using Microsoft.EntityFrameworkCore;
using pbl6_be.Common.Utilities;
using pbl6_be.Common.Utilities.Exceptions;
using pbl6_be.Domain;
using pbl6_be.Services.TokenService;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;

namespace pbl6_be.Services.Authentication
{
    public partial class AuthenticationService : IAuthenticationService
    {
        private readonly Context _context;
        private readonly ITokenService _tokenService;
        private readonly ILogger _logger;

        public AuthenticationService(Context context,
            ITokenService tokenService,
            ILogger<AuthenticationService> logger)
        {
            _context = context;
            _tokenService = tokenService;
            _logger = logger;
        }

        public async Task<AuthenticateResponse> Login(AuthenticateRequest request, string language)
        {
            try
            {
                _logger.LogInformation("User login");
                var user = await _context.Users.Where(u => u.Email == request.Email)
                .Include(u => u.Role)
                .FirstOrDefaultAsync();
                if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                {
                    _logger.LogInformation("User login fail with account {@Account}", request);
                    throw new UnAuthorizedException(ConstantErrorMessage.INVALID_EMAIL_PASSWORD(language));
                }
                _logger.LogInformation("User with ID = {Id} login successfully", user.Id);
                return new AuthenticateResponse(user, GenerateLoginToken(user));
            }
            catch (Exception ex)
            {
                _logger.LogInformation("User with account = {@Account} login fail. Error = {Message}", request, ex.Message);
                throw;
            }
        }

        public async Task<string> LoginTable(AuthenticateRequest request, string language)
        {
            try
            {
                _logger.LogInformation("User login");
                var table = await _context.Tables.Where(u => u.TableName == request.Email)
                .FirstOrDefaultAsync();
                if (table == null || !BCrypt.Net.BCrypt.Verify(request.Password, table.Password))
                {
                    _logger.LogInformation("Table login fail with account {@Account}", request);
                    throw new UnAuthorizedException(ConstantErrorMessage.INVALID_EMAIL_PASSWORD(language));
                }
                _logger.LogInformation("Table with ID = {Id} login successfully", table.Id);
                return GenerateLoginTokenForTable(table);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Table with account = {@Account} login fail. Error = {Message}", request, ex.Message);
                throw;
            }
        }
    }
}
