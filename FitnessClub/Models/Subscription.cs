using System;
using System.Collections.Generic;

namespace FitnessClub.Models;

public partial class Subscription
{
    public int Id { get; set; }

    public decimal PricePerDay { get; set; }

    public string Title { get; set; } = null!;

    public decimal? Rating { get; set; }

    public virtual ICollection<Discount> Discounts { get; } = new List<Discount>();

    public virtual ICollection<Order> Orders { get; } = new List<Order>();

    public virtual ICollection<Review> Reviews { get; } = new List<Review>();

    public virtual ICollection<Wishlist> Wishlists { get; } = new List<Wishlist>();
}
