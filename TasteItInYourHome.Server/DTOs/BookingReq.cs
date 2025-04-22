namespace TasteItInYourHome.Server.DTOs
{
    public class BookingReq
    {
            public int? UserId { get; set; }
            public int? ChefId { get; set; }
            public int? FoodId { get; set; }
            public int? ServiceId { get; set; }
            public int NumberOfGuests { get; set; }
            public DateOnly BookingDate { get; set; }
            public string TimeSlot { get; set; } = string.Empty;
            public string? Status { get; set; }
        

    }
}
