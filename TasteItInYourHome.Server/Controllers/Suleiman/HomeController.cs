using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TasteItInYourHome.Server.IDataService;

namespace TasteItInYourHome.Server.Controllers.Suleiman
{
    [Route("[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly SuleimanIDataService _dataService;
        public HomeController(SuleimanIDataService dataService)
        {
                _dataService = dataService;
        }

        [HttpGet("GetAllServices")]
        public IActionResult allServices()
        {
            var services = _dataService.getAllServices();
            return Ok(services);

        }
    }
}
