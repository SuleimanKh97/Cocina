namespace TasteItInYourHome.Server.Dtos
{
    public class FeedbackDto
    {
        public int? BookingId { get; set; }
        public int? Rating { get; set; }
        public string? Comment { get; set; }

        public DateTime SubmittedAt { get; set; }

        public string UserName { get; set; }
        public string ChefName { get; set; }
        public string FoodName { get; set; }
    }
}
