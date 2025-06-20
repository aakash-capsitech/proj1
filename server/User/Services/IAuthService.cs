using AuthenticationApp.Models;
using AuthenticationApp.Models.DTOs;

namespace AuthenticationApp.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto?> RegisterAsync(RegisterDto registerDto);
        Task<AuthResponseDto?> LoginAsync(LoginDto loginDto);
        string GenerateJwtToken(User user);
        string HashPassword(string password);
        bool VerifyPassword(string password, string hash);
    }
}