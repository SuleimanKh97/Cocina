using TasteItInYourHome.Server.DTOs;

namespace TasteItInYourHome.Server.IDataService
{
    public interface SallyIDataService
    {

        int? LoginAndGetId(loginUserDTO user);
        Task<string> Register(addUserDTO user);
        Task<GoogleLoginResponseDTO?> GoogleLogin(string token);

        // تحديثات للفورجت باسورد
        Task SendPasswordResetCodeAsync(string toEmail);
        bool VerifyResetCode(string email, string code);
        Task<bool> ResetPasswordAsync(string email, string newPassword);

    }
}
