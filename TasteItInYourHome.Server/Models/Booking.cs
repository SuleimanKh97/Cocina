using System;
using System.Collections.Generic;

namespace TasteItInYourHome.Server.Models;

public partial class Booking
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? ChefId { get; set; }

    public int? FoodId { get; set; }

    public int? ServiceId { get; set; }

    public int? NumberOfGuests { get; set; }

    public DateOnly BookingDate { get; set; }

    public string? TimeSlot { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Chef? Chef { get; set; }

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual Food? Food { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual Service? Service { get; set; }

    public virtual User? User { get; set; }
}
