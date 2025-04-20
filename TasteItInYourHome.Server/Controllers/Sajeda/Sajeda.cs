using System.Diagnostics.Eventing.Reader;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.Models;

namespace TasteItInYourHome.Server.Controllers.Sajeda
{
    [Route("api/[controller]")]
    [ApiController]
    public class Sajeda : ControllerBase
    {
        private readonly TasteItInYourHome.Server.IDataService.SajedaIDataService _data;

        public Sajeda(TasteItInYourHome.Server.IDataService.SajedaIDataService data){
            _data =  data;
            }

        [HttpPost("CreateBook")]
        public IActionResult addBook([FromForm] BookingReq bookDTO)
        {
            if (bookDTO == null)
            {
                return BadRequest();
            }
            else
            {
                bool book = _data.AddBook(bookDTO);
                if (book)
                {
                    return Ok(bookDTO);
                }
                else
                {
                    return BadRequest();
                }
            }
        }


        [HttpGet("getUser/{id}")]
        public IActionResult getUser(int id)
        {
            var user = _data.getUserByID(id);
            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound();
            }   
        }

        [HttpGet("getChiefs")]
        public IActionResult GetCheifs()
        {
            var chiefs = _data.getAllChifs();
            if (chiefs != null)
            {
                return Ok(chiefs);
            }
            else {
                return BadRequest();
            }
        }

        [HttpGet("getCategories")]
        public IActionResult getAllCategories() { 
            var categories = _data.getAllFoodCategories();
            if (categories != null)
            {
                return Ok(categories);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("getfood")]
        public IActionResult GetByChefAndCategory([FromQuery] int chefId, [FromQuery] int categoryId)
        {
            var filter = _data.GetByChefAndCategoryAsync(chefId, categoryId);
            if (chefId != null)
            return Ok(filter);
            else return NotFound();
        }

        [HttpGet("getService")]
        public IActionResult getServices()
        {
            var service = _data.GetAllServ();
            if (service != null)
                return Ok(service);
            else 
                return NotFound();
        }



        /////////////*****************Payment*****************////////////////////////////////

        [HttpPost("Pay")]
        public IActionResult addPayment(PaymentRequest dtoPayment)
        {
            var payment = _data.addPayment(dtoPayment);
            if (payment != null)
            {
                return Ok(payment);
            }
            else 
            {
                return NotFound(); 
            }
        }

        [HttpGet("getBook/{id}")]
        public IActionResult dgetBookByID(int id) { 
            var bookID = _data.getBookID(id);
            if (bookID != null)
            {
                return Ok(bookID);
            }
            else {
                return NoContent();

            }
        }
    }
}
