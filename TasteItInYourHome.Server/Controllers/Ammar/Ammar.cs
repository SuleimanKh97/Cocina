using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.IDataService;

namespace TasteItInYourHome.Server.Controllers.Ammar
{
    [Route("api/[controller]")]
    [ApiController]
    public class Ammar : ControllerBase
    {
        private readonly AmmarIDataService _data;
        
        public Ammar(AmmarIDataService data)
        {
            _data = data;
        }


        [HttpGet("GetAllChef")]
        public IActionResult GetChefs()
        {
            var chefs = _data.GetChefs();
            return Ok(chefs);
        }

        [HttpDelete]
        [Route("DeleteChef/{id}")]
        public IActionResult DeleteChef(int id)
        {
            var chefs = _data.GetChefs();
            var chefToDelete = chefs.FirstOrDefault(c => c.Id == id);
            if (chefToDelete != null)
            {
                chefs.Remove(chefToDelete);
                return Ok(chefs);
            }
            return NotFound();
        }


        [HttpPost]
        [Route("AddChef")]
        public IActionResult AddChef([FromForm] ChefRequestDTO newChef)
        {
            if (ModelState.IsValid)
            {
                _data.AddChef(newChef);
                return Ok(newChef);
            }
            return BadRequest(ModelState);
        }



        [HttpPut("EditChef/{id}")]
        public IActionResult EditChef(int id, [FromForm] ChefRequestDTO chef)
        {
            if (chef == null)
                return BadRequest();
            else
            {
                bool updated = _data.EditChef(id, chef);
                if (updated == false)
                    return BadRequest();
                else
                    return Ok();
            }

        }


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////


        [HttpGet("GetAllFood")]
        public IActionResult GetFoods()
        {
            var Foods = _data.GetFoods();
            return Ok(Foods);
        }



        [HttpDelete("DeleteFood/{id}")]
        public IActionResult DeleteFood(int id)
        {
            var Foods = _data.GetFoods();
            var foodToDelete = Foods.FirstOrDefault(c => c.Id == id);
            if (foodToDelete != null)
            {
                Foods.Remove(foodToDelete);
                return Ok(Foods);
            }
            return NotFound();
        }


        [HttpPost("AddFood")]
        public IActionResult AddFood([FromForm] FoodRequestDTO newFood)
        {
            if (ModelState.IsValid)
            {
                _data.AddFood(newFood);
                return Ok(newFood);
            }
            return BadRequest(ModelState);
        }



        [HttpPut("EditFood/{id}")]
        public IActionResult EditFood(int id, [FromForm] FoodRequestDTO food)
        {
            if (food == null)
                return BadRequest();
            else
            {
                bool updated = _data.EditFood(id, food);
                if (updated == false)
                    return BadRequest();
                else
                    return Ok();
            }

        }










        ///////////////////////////////////////////////////////////////////
        //user///
        [HttpGet("GetAllUser")]
        public IActionResult GetUsers()
        {
            var users = _data.GetUsers();
            return Ok(users);
        }


        ///////////////////////////////////////////////////////////////////


        [HttpGet("GetAllCategory")]
        public IActionResult GetALlCategory()
        {
            var Category = _data.GetALlCategory();
            return Ok(Category);
        }

        [HttpDelete("DeleteCategory/{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var Category = _data.GetALlCategory();
            var categoryToDelete = Category.FirstOrDefault(c => c.Id == id);
            if (categoryToDelete != null)
            {
                Category.Remove(categoryToDelete);
                return Ok(Category);
            }
            return NotFound();
        }



        [HttpPost("AddCategory")]
        public IActionResult AddCategory([FromForm] CategoryFoodRequestDTO newCategory)
        {
            if (ModelState.IsValid)
            {
                _data.AddCategory(newCategory);
                return Ok(newCategory);
            }
            return BadRequest(ModelState);
        }


        [HttpPut("EditCategory/{id}")]
        public IActionResult EditCategory(int id, [FromForm] CategoryFoodRequestDTO category)
        {
            if (category == null)
                return BadRequest();
            else
            {
                bool updated = _data.EditCategory(id, category);
                if (updated == false)
                    return BadRequest();
                else
                    return Ok();
            }
        }






    }
}
