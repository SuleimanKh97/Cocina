using TasteItInYourHome.Server.DTOs;

namespace TasteItInYourHome.Server.IDataService
{
    public interface SallyIDataService
    {

        public bool login(loginUserDTO user);

        Task<string> Register(addUserDTO user);
    }
}
