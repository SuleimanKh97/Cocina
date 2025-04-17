using System;
using System.Collections.Generic;

namespace TasteItInYourHome.Server.Models;

public partial class ContactU
{
    public int Id { get; set; }

    public string FullName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Message { get; set; }

    public DateTime? SubmittedAt { get; set; }
}
