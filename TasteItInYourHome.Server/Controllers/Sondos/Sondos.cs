using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TasteItInYourHome.Server.Models;
using BCrypt.Net;
using TasteItInYourHome.Server.DTOs;

namespace TasteItInYourHome.Server.Controllers.Sondos
{
    [Route("api/[controller]")]
    [ApiController]
    public class Sondos : ControllerBase
    {
        private readonly IDataService.SondosIDataService _data;

        public Sondos(IDataService.SondosIDataService data)
        {
            _data = data;
        }

        [HttpGet("AllUser")]
        public IActionResult GetAll()
        {
            var all = _data.GetAll();
            return Ok(all);
        }

        [HttpGet("GetProfile/{id}")]

        public IActionResult getUserById(int id)
        {
            var user = _data.getUserById(id);
            if (user == null)
                return NotFound("User not found");
            return Ok(user);
        }



        [HttpPut("UpdateProfile/{id}")]
        public IActionResult UpdateProfile(int id, EditProfile Dto)
        {
            if (Dto == null)
            {
                return BadRequest();
            }

            var user = _data.UpdateProfile(id, Dto);
            if (user ==true )
            {
                return Ok();
            }
            return NotFound();
        }



        [HttpPut("ChangePassword/{id}")]
        public IActionResult ChangePassword(int id, [FromBody] changePassword Dto)
        {
            if (Dto == null)
                return BadRequest("Invalid data");

            try
            {
                _data.ChangePassword(id, Dto);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("BookingHistory/{userId}")]
        public IActionResult GetUserBookingHistory(int userId)
        {
            var bookingHistory = _data.GetUserBookingHistory(userId);
            var user = _data.getUserById(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }
            else
            {

                if (bookingHistory == null || !bookingHistory.Any())
                {
                    return NotFound("No booking for this User");
                }

                return Ok(bookingHistory);
            }


        }

    }
}
