using System;
using System.Collections.Generic;

namespace FitnessClub.Models;

public partial class Duration
{
    public int Id { get; set; }

    public short DurationInDays { get; set; }

    public virtual ICollection<Order> Orders { get; } = new List<Order>();
}
