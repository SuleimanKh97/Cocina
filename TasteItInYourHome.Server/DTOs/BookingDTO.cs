using TasteItInYourHome.Server.Models;

namespace TasteItInYourHome.Server.DTOs
{
    public class BookingDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; } = null!;
        public string ChefName { get; set; } = null!;
        public string FoodName { get; set; } = null!;
        public string ServiceName { get; set; } = null!;
        public virtual Service? Service { get; set; }

        public int NumberOfGuests { get; set; }
        public DateTime BookingDate { get; set; }
        public string? TimeSlot { get; set; }
        public string Status { get; set; }


    }
}

