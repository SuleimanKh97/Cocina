﻿using System;
using System.Collections.Generic;

namespace TasteItInYourHome.Server.Models;

public partial class FoodCategory
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public virtual ICollection<Food> Foods { get; set; } = new List<Food>();
}
