using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.IDataService;
using Google.Apis.Auth;
using TasteItInYourHome.Server.Models;
using Azure.Core;

namespace TasteItInYourHome.Server.Controllers.Sally
{
    [Route("api/[controller]")]
    [ApiController]
    public class Sally : ControllerBase
    {
        private readonly SallyIDataService _data;

        public Sally(SallyIDataService data)
        {
            _data = data;
        }


        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public IActionResult login(loginUserDTO user)
        {
            if (user.Email == null || user.Password == null)
            {
                return BadRequest();
            }

            var userId = _data.LoginAndGetId(user);
            if (userId != null)
            {
                return Ok(new { UserId = userId });
            }
            else
            {
                return NotFound();
            }
        }



        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register(addUserDTO user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string result = await _data.Register(user);

            if (result == "Email already exists.")
                return BadRequest(result);

            return StatusCode(StatusCodes.Status201Created, new { message = result });

        }



        [HttpPost("GoogleLogin")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequestDTO request)
        {
            var result = await _data.GoogleLogin(request.Token);
            return result != null ? Ok(result) : BadRequest("فشل تسجيل الدخول بجوجل");
        }


      

    }
}
