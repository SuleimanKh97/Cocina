namespace TasteItInYourHome.Server.DTOs
{
    public class PaymentDTO
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public decimal Amount { get; set; }
        public string? PaymentMethod { get; set; }
        public string? Status { get; set; }


        public string? ServiceName { get; set; }
        public DateTime? PaymentDate { get; set; }
    }
}
