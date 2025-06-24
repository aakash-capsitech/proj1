using Microsoft.AspNetCore.Mvc;
using AuthenticationApp.Models.DTOs;
using AuthenticationApp.Services;
using Google.Apis.Auth;


namespace AuthenticationApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var result = await _authService.RegisterAsync(registerDto);

            if (result == null)
                return BadRequest("User with this email or username already exists");

            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var result = await _authService.LoginAsync(loginDto);

            if (result == null)
                return Unauthorized("Invalid email or password");

            return Ok(result);
        }

        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] TokenRequest request)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(request.Token);
            // Create user/session/JWT etc.
            return Ok(new { email = payload.Email });
        }

        public class TokenRequest
        {
            public string? Token { get; set; }
        }

    }
}

