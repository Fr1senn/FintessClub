using System;
using System.Collections.Generic;

namespace FitnessClub.Models;

public partial class Discount
{
    public int Id { get; set; }

    public decimal DiscountPercentage { get; set; }

    public bool IsActive { get; set; }

    public int? SubscriptionId { get; set; }

    public virtual Subscription? Subscription { get; set; }
}
