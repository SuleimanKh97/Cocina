using TasteItInYourHome.Server.IDataService;
using TasteItInYourHome.Server.Models;

namespace TasteItInYourHome.Server.DataService
{
    public class SuleimanDataService : SuleimanIDataService
    {
        private readonly ChefProjectContext _db;
        public SuleimanDataService(ChefProjectContext db)
        {
            _db = db;
        }
        public List<Service> getAllServices()
        {
            return _db.Services.ToList();
        }
    }
}
