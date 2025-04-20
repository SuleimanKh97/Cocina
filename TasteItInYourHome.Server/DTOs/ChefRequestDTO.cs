namespace TasteItInYourHome.Server.DTOs
{
    public class ChefRequestDTO
    {
        public string FullName { get; set; } = null!;

        public string? Bio { get; set; }

        public int? ExperienceYears { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public string? AvailabilitySchedule { get; set; }

        public string? ImageUrl { get; set; }


    }
}
