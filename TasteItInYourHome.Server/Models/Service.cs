using System;
using System.Collections.Generic;

namespace TasteItInYourHome.Server.Models;

public partial class Service
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
