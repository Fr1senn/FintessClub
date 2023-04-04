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

    public int? DaysAmount { get; set; }

    public virtual Subscription? Subscription { get; set; }

    public virtual User? User { get; set; }

    public Order() { }

    public Order(int UserId, int SubscriptionId, int DaysAmount)
    {
        this.UserId = UserId;
        this.SubscriptionId = SubscriptionId;
        this.DaysAmount = DaysAmount;
    }
}
