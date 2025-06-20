using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthenticationApp.Data;
using AuthenticationApp.Models;
using AuthenticationApp.Models.DTOs;
using BCrypt.Net;
using MongoDB.Driver;

namespace AuthenticationApp.Services
{
    public class AuthService : IAuthService
    {
        private readonly MongoDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(MongoDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<AuthResponseDto?> RegisterAsync(RegisterDto registerDto)
        {
            // Check if user already exists
            var existingEmailUser = await _context.Users
                .Find(u => u.Email == registerDto.Email)
                .FirstOrDefaultAsync();
            
            if (existingEmailUser != null)
                return null;

            var existingUsernameUser = await _context.Users
                .Find(u => u.Username == registerDto.Username)
                .FirstOrDefaultAsync();
            
            if (existingUsernameUser != null)
                return null;

            // Create new user
            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                PasswordHash = HashPassword(registerDto.Password),
                Role = "User"
            };

            await _context.Users.InsertOneAsync(user);

            // Generate token
            var token = GenerateJwtToken(user);

            return new AuthResponseDto
            {
                Token = token,
                Role = user.Role,
                Username = user.Username,
                Email = user.Email
            };
        }

        public async Task<AuthResponseDto?> LoginAsync(LoginDto loginDto)
        {
            // Find user
            var user = await _context.Users
                .Find(u => u.Email == loginDto.Email)
                .FirstOrDefaultAsync();
            
            if (user == null || !VerifyPassword(loginDto.Password, user.PasswordHash))
                return null;

            // Generate token
            var token = GenerateJwtToken(user);

            return new AuthResponseDto
            {
                Token = token,
                Role = user.Role,
                Username = user.Username,
                Email = user.Email
            };
        }

        public string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"] ?? "");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("id", user.Id.ToString()),
                    new Claim("email", user.Email),
                    new Claim("username", user.Username),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool VerifyPassword(string password, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
    }
}