using Microsoft.AspNetCore.Mvc;
using AuthenticationApp.Data;
using AuthenticationApp.Models;
using AuthenticationApp.Services;

namespace AuthenticationApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly MongoDbContext _context;
        private readonly IAuthService _authService;

        public AdminController(MongoDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("create-admin")]
        public async Task<IActionResult> CreateAdmin([FromBody] CreateAdminDto dto)
        {
            // In production, this should be properly secured
            var adminUser = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = _authService.HashPassword(dto.Password),
                Role = "Admin"
            };

            await _context.Users.InsertOneAsync(adminUser);

            return Ok(new { message = "Admin user created successfully" });
        }
    }

    public class CreateAdminDto
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
