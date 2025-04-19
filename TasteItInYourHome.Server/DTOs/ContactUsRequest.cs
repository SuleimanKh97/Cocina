using System.ComponentModel.DataAnnotations;

namespace TasteItInYourHome.Server.DTOs
{
    public class ContactUsRequest
    {
        [Required(ErrorMessage = "Full name is required.")]
        [MaxLength(100, ErrorMessage = "Full name can't be longer than 100 characters.")]
        public string FullName { get; set; } = null!;

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; } = null!;

        public string? Message { get; set; }
    }
}
