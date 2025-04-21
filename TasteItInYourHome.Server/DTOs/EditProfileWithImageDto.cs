namespace TasteItInYourHome.Server.DTOs
{
    public class EditProfileWithImageDto
    {

        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public IFormFile? ImageFile { get; set; } 


    }
}
