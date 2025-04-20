namespace TasteItInYourHome.Server.DTOs
{
    public class CategoryFoodRequestDTO
    {
        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }
    }
}
