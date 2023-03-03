using System;
using System.Collections.Generic;

namespace FitnessClub.Models;

public partial class Review
{
    public int Id { get; set; }

    public string? ReviewText { get; set; }

    public DateOnly ReviewDate { get; set; }

    public int? UserId { get; set; }

    public int? SubscriptionId { get; set; }

    public short? Estimation { get; set; }

    public virtual Subscription? Subscription { get; set; }

    public virtual User? User { get; set; }
}
