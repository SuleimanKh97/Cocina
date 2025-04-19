using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.IDataService;
using Google.Apis.Auth;
using TasteItInYourHome.Server.Models;
using TasteItInYourHome.Server.Controllers.Sally;

namespace TasteItInYourHome.Server.Controllers.Sally
{
    [Route("api/[controller]")]
    [ApiController]
    public class SallyController : ControllerBase
    {
        private readonly SallyIDataService _data;
        private readonly ILogger<SallyController> _logger;

        public SallyController(SallyIDataService data, ILogger<SallyController> logger)
        {
            _data = data;
            _logger = logger;
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult Login([FromBody] loginUserDTO user)
        {
            try
            {
                if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
                {
                    return BadRequest("Email and password are required");
                }

                var userId = _data.LoginAndGetId(user);
                if (userId == null)
                {
                    return Unauthorized("Invalid email or password");
                }

                return Ok(new { UserId = userId });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request");
            }
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromForm] addUserDTO user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                string result = await _data.Register(user);

                if (result == "Email already exists.")
                {
                    return Conflict(new { message = result });
                }

                return StatusCode(StatusCodes.Status201Created, new { message = result });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during registration");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request");
            }
        }

        [HttpPost("google-login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequestDTO request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Token))
                {
                    return BadRequest("Token is required");
                }

                var result = await _data.GoogleLogin(request.Token);
                return result != null ? Ok(result) : BadRequest("Failed to login with Google");
            }
            catch (InvalidJwtException ex)
            {
                _logger.LogError(ex, "Invalid Google token");
                return BadRequest("Invalid Google token");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during Google login");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request");
            }
        }

        [HttpPost("send-reset-code")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SendResetCode([FromBody] ResetCodeRequestDTO request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Email))
                {
                    return BadRequest("Email is required");
                }

                await _data.SendPasswordResetCodeAsync(request.Email);
                return Ok(new { message = "Reset code sent successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending reset code");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while sending reset code");
            }
        }

        [HttpPost("verify-reset-code")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult VerifyResetCode([FromBody] VerifyCodeDTO request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Code))
                {
                    return BadRequest("Email and code are required");
                }

                bool isValid = _data.VerifyResetCode(request.Email, request.Code);
                return isValid ? Ok(new { message = "Code verified successfully" })
                             : BadRequest("Invalid verification code");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error verifying reset code");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while verifying code");
            }
        }

        [HttpPost("reset-password")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.NewPassword))
                {
                    return BadRequest("Email and new password are required");
                }

                bool success = await _data.ResetPasswordAsync(request.Email, request.NewPassword);
                return success ? Ok(new { message = "Password reset successfully" })
                             : BadRequest("Failed to reset password");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error resetting password");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while resetting password");
            }
        }
    }

    // DTO Classes
    public class ResetCodeRequestDTO
    {
        public string Email { get; set; }
    }

    
}