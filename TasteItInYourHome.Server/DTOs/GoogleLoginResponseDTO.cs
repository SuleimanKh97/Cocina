namespace TasteItInYourHome.Server.DTOs
{
    public class GoogleLoginResponseDTO
    {
        public string Email { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public bool IsGoogleUser { get; set; }
      
    }
}
