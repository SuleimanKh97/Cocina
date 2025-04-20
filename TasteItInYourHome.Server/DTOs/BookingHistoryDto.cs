namespace TasteItInYourHome.Server.DTOs
{
    public class BookingHistoryDto
    {

        public int Id { get; set; }
        public string ChefName { get; set; }
        public string FoodName { get; set; }
        public string ServiceName { get; set; }
        public int? NumberOfGuests { get; set; }
        public string BookingDate { get; set; }
        public string TimeSlot { get; set; }
        public string Status { get; set; }
        public string CreatedAt { get; set; }

    }
}
