using TasteItInYourHome.Server.DTOs;
using TasteItInYourHome.Server.Models;

namespace TasteItInYourHome.Server.IDataService
{
    public interface SuleimanIDataService
    {
        public List<Service> getAllServices();

        public bool newContact(ContactUsRequest contact);
        

    }
}
