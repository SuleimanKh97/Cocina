namespace TasteItInYourHome.Server.Dtos
{
    public class FeedbackDto
    {
        public int? BookingId { get; set; }
        public int? Rating { get; set; }
        public string? Comment { get; set; }
    }
}
