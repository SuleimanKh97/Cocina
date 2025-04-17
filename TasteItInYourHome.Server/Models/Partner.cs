using System;
using System.Collections.Generic;

namespace TasteItInYourHome.Server.Models;

public partial class Partner
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string? ContactInfo { get; set; }
}
