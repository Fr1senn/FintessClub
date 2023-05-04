namespace FitnessClub.Models.DTOs
{
    public class SubscriptionDTO
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public double? PricePerDay { get; set; }
        public byte? DiscountPercentage { get; set; }
        public bool? IsActive { get; set; }
    }
}
