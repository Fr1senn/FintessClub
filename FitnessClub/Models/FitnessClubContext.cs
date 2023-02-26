using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FitnessClub.Models;

public partial class FitnessClubContext : DbContext
{
    private readonly IConfiguration? _configuration;

    public FitnessClubContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public FitnessClubContext(DbContextOptions<FitnessClubContext> options) : base(options)
    {
    }

    public FitnessClubContext(DbContextOptions<FitnessClubContext> options, IConfiguration configuration) :
        base(options)
    {
        _configuration = configuration;
    }

    public virtual DbSet<Attendance> Attendances { get; set; }

    public virtual DbSet<Discount> Discounts { get; set; }

    public virtual DbSet<Duration> Durations { get; set; }

    public virtual DbSet<Exercise> Exercises { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Subscription> Subscriptions { get; set; }

    public virtual DbSet<TrainingSchedule> TrainingSchedules { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Wishlist> Wishlists { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("defaultConnection"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Attendance>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("attendance_pkey");

            entity.ToTable("attendance");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AttendanceDate)
                .HasDefaultValueSql("CURRENT_DATE")
                .HasColumnName("attendance_date");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Attendances)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("attendance_user_id_fkey");
        });

        modelBuilder.Entity<Discount>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("discounts_pkey");

            entity.ToTable("discounts");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DiscountPercentage)
                .HasPrecision(5, 2)
                .HasColumnName("discount_percentage");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.SubscriptionId).HasColumnName("subscription_id");

            entity.HasOne(d => d.Subscription).WithMany(p => p.Discounts)
                .HasForeignKey(d => d.SubscriptionId)
                .HasConstraintName("discounts_subscriptioni_d_fkey");
        });

        modelBuilder.Entity<Duration>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("durations_pkey");

            entity.ToTable("durations");

            entity.HasIndex(e => e.DurationInDays, "durations_duration_in_days_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DurationInDays).HasColumnName("duration_in_days");
        });

        modelBuilder.Entity<Exercise>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("exercises_pkey");

            entity.ToTable("exercises");

            entity.HasIndex(e => e.Title, "exercises_title_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("orders_pkey");

            entity.ToTable("orders");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DurationId).HasColumnName("duration_id");
            entity.Property(e => e.Price)
                .HasPrecision(7, 2)
                .HasColumnName("price");
            entity.Property(e => e.PurchaseDate)
                .HasDefaultValueSql("CURRENT_DATE")
                .HasColumnName("purchase_date");
            entity.Property(e => e.SubscriptionId).HasColumnName("subscription_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Duration).WithMany(p => p.Orders)
                .HasForeignKey(d => d.DurationId)
                .HasConstraintName("orders_duration_id_fkey");

            entity.HasOne(d => d.Subscription).WithMany(p => p.Orders)
                .HasForeignKey(d => d.SubscriptionId)
                .HasConstraintName("orders_subscription_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("orders_useri_d_fkey");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("reviews_pkey");

            entity.ToTable("reviews");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.ReviewDate)
                .HasDefaultValueSql("CURRENT_DATE")
                .HasColumnName("review_date");
            entity.Property(e => e.ReviewText).HasColumnName("reviewText");
            entity.Property(e => e.SubscriptionId).HasColumnName("subscription_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Subscription).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.SubscriptionId)
                .HasConstraintName("reviews_subscription_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("reviews_user_id_fkey");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("roles_pkey");

            entity.ToTable("roles");

            entity.HasIndex(e => e.Title, "roles_title_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Title)
                .HasMaxLength(64)
                .HasColumnName("title");
        });

        modelBuilder.Entity<Subscription>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("subscriptions_pkey");

            entity.ToTable("subscriptions");

            entity.HasIndex(e => e.Title, "subscriptions_title_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.PricePerDay)
                .HasPrecision(5, 2)
                .HasColumnName("price_per_day");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");
        });

        modelBuilder.Entity<TrainingSchedule>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("training_schedules_pkey");

            entity.ToTable("training_schedules");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ExerciseId).HasColumnName("exercise_id");
            entity.Property(e => e.TrainingDate).HasColumnName("training_date");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Exercise).WithMany(p => p.TrainingSchedules)
                .HasForeignKey(d => d.ExerciseId)
                .HasConstraintName("training_schedules_exercise_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.TrainingSchedules)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("training_schedules_user_id_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "users_email_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BirthDate).HasColumnName("birth_date");
            entity.Property(e => e.Email)
                .HasMaxLength(320)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .HasColumnName("last_name");
            entity.Property(e => e.Password)
                .HasMaxLength(64)
                .HasColumnName("password");
            entity.Property(e => e.RegistrationDate)
                .HasDefaultValueSql("CURRENT_DATE")
                .HasColumnName("registration_date");
            entity.Property(e => e.RoleId)
                .HasDefaultValueSql("1")
                .HasColumnName("role_id");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("users_role_id_fkey");
        });

        modelBuilder.Entity<Wishlist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("wishlists_pkey");

            entity.ToTable("wishlists");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.SubscriptionId).HasColumnName("subscription_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Subscription).WithMany(p => p.Wishlists)
                .HasForeignKey(d => d.SubscriptionId)
                .HasConstraintName("wishlists_subscription_id_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Wishlists)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("wishlists_user_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}