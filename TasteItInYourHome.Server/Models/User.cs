using System;
using System.Collections.Generic;

namespace TasteItInYourHome.Server.Models;

public partial class User
{
    public int Id { get; set; }

    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public string? Address { get; set; }

    public string? ImageUrl { get; set; }

    public DateTime? CreatedAt { get; set; }

    public bool IsGoogleUser { get; set; }

    public string? GoogleId { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
