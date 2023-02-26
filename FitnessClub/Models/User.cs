using System;
using System.Collections.Generic;

namespace FitnessClub.Models;

public partial class User
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? Email { get; set; }

    public string Password { get; set; } = null!;

    public DateOnly BirthDate { get; set; }

    public DateOnly RegistrationDate { get; set; }

    public int? RoleId { get; set; }

    public virtual ICollection<Attendance> Attendances { get; } = new List<Attendance>();

    public virtual ICollection<Order> Orders { get; } = new List<Order>();

    public virtual ICollection<Review> Reviews { get; } = new List<Review>();

    public virtual Role? Role { get; set; }

    public virtual ICollection<TrainingSchedule> TrainingSchedules { get; } = new List<TrainingSchedule>();

    public virtual ICollection<Wishlist> Wishlists { get; } = new List<Wishlist>();
}
