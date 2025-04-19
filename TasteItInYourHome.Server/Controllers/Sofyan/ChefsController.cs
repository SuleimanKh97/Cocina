using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TasteItInYourHome.Server.Controllers.Sofyan
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChefsController : ControllerBase
    {
        private readonly IDataService.SofyanIDataService _Data;
        public ChefsController(IDataService.SofyanIDataService Data)
        {
            _Data = Data;
        }

        [HttpGet ("ShowAllChefs")]
        public IActionResult GetAllChefs()
        {
            var chefs = _Data.GetAllChefs();
            if (chefs == null || !chefs.Any())
            {
                return NotFound("No chefs found.");
            }
            return Ok(chefs);
        }

    }
}
