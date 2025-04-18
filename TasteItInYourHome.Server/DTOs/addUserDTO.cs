using System.ComponentModel.DataAnnotations;

namespace TasteItInYourHome.Server.DTOs
{
    public class addUserDTO
    {
        [Required(ErrorMessage = "Full name is required.")]
        [MaxLength(100, ErrorMessage = "Full name can't be longer than 100 characters.")]
        public string FullName { get; set; } = null!;

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
        public string Password { get; set; } = null!;

        [Phone(ErrorMessage = "Invalid phone number.")]
        public string? PhoneNumber { get; set; }

        [MaxLength(200, ErrorMessage = "Address can't be longer than 200 characters.")]
        public string? Address { get; set; }

        // إضافة الخاصية لتحميل الصورة
        // إضافة خاصية ImageUrl لتخزين الرابط
        public string? ImageUrl { get; set; }

        public IFormFile? Image { get; set; }
    }
}
