using System;
using System.Collections.Generic;

namespace FitnessClub.Models;

public partial class Discount
{
    public int Id { get; set; }

    public short DiscountPercentage { get; set; }

    public bool IsActive { get; set; }

    public int? SubscriptioniD { get; set; }

    public virtual Subscription? Subscription { get; set; }
}
