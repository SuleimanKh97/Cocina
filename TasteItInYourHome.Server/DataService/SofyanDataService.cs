using TasteItInYourHome.Server.IDataService;
using TasteItInYourHome.Server.Models;

namespace TasteItInYourHome.Server.DataService
{
    public class SofyanDataService : SofyanIDataService
    {
        private readonly ChefProjectContext _context;

        public SofyanDataService(ChefProjectContext context)
        {
            _context = context;
        }

        public List<Chef> GetAllChefs()
        {
            return _context.Chefs.ToList();
        }
    }
}
