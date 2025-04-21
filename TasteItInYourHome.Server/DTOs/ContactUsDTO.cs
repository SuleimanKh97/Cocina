namespace TasteItInYourHome.Server.DTOs
{
    public class ContactUsDTO
    {
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Message { get; set; } = null!;
        public DateTime? SubmittedAt { get; set; }
    }
}
