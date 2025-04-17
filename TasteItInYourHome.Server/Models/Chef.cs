using System;
using System.Collections.Generic;

namespace TasteItInYourHome.Server.Models;

public partial class Chef
{
    public int Id { get; set; }

    public string FullName { get; set; } = null!;

    public string? Bio { get; set; }

    public int? ExperienceYears { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? AvailabilitySchedule { get; set; }

    public string? ImageUrl { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual ICollection<Food> Foods { get; set; } = new List<Food>();
}
