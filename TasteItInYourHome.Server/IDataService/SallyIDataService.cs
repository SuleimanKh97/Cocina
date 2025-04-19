using TasteItInYourHome.Server.DTOs;

namespace TasteItInYourHome.Server.IDataService
{
    public interface SallyIDataService
    {

        public int? LoginAndGetId(loginUserDTO user);

        Task<string> Register(addUserDTO user);
        public  Task<GoogleLoginResponseDTO?> GoogleLogin(string token);
    }
}
