namespace TasteItInYourHome.Server.DTOs
{
    public class EditProfile
    {

        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? ImageUrl { get; set; }


    }
}
