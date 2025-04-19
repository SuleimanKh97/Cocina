namespace TasteItInYourHome.Server.DTOs
{
    public class PaymentRequest
    {
            public int? BookingId { get; set; }
            public decimal Amount { get; set; }
            public string? PaymentMethod { get; set; }
            public string? PaymentStatus { get; set; }
            public DateTime? PaymentDate { get; set; }

        

    }
}
