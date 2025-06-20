using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AuthenticationApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet("public")]
        public IActionResult Public()
        {
            return Ok(new { message = "This is a public endpoint" });
        }

        [Authorize]
        [HttpGet("protected")]
        public IActionResult Protected()
        {
            var userId = User.FindFirst("id")?.Value;
            var username = User.FindFirst("username")?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            return Ok(new { 
                message = "This is a protected endpoint",
                userId = userId,
                username = username,
                role = role
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
        public IActionResult AdminOnly()
        {
            return Ok(new { message = "This is admin-only content" });
        }

        [Authorize(Roles = "User,Admin")]
        [HttpGet("user")]
        public IActionResult UserContent()
        {
            return Ok(new { message = "This content is for users and admins" });
        }
    }
}
