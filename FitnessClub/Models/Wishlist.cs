using System;
using System.Collections.Generic;

namespace FitnessClub.Models;

public partial class Wishlist
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? SubscriptionId { get; set; }

    public int DaysAmount { get; set; }

    public virtual Subscription? Subscription { get; set; }

    public virtual User? User { get; set; }
}
