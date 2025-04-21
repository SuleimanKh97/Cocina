namespace TasteItInYourHome.Server.DTOs
{
    public class FoodRequestDTO
    {
        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }

        public int? CategoryId { get; set; }

        public int? ChefId { get; set; }
    }
}
