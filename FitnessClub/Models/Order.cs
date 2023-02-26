using System;
using System.Collections.Generic;

namespace FitnessClub.Models;

public partial class Order
{
    public int Id { get; set; }

    public decimal Price { get; set; }

    public DateOnly PurchaseDate { get; set; }

    public int? UserId { get; set; }

    public int? SubscriptionId { get; set; }

    public int? DurationId { get; set; }

    public virtual Duration? Duration { get; set; }

    public virtual Subscription? Subscription { get; set; }

    public virtual User? User { get; set; }
}
