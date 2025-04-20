using System;
using System.Collections.Generic;

namespace TasteItInYourHome.Server.Models;

public partial class Food
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public int? CategoryId { get; set; }

    public int? ChefId { get; set; }

    public decimal? Price { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual FoodCategory? Category { get; set; }

    public virtual Chef? Chef { get; set; }
}
