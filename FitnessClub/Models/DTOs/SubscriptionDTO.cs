using System.ComponentModel.DataAnnotations;

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

    public class SubcriptionWithNewDiscountDTO
    {
        [MinLength(3)]
        public string Title { get; set; }
        [Range(0.1, Double.MaxValue)]
        public decimal PricePerDay { get; set; }
        [Range(1,99, ErrorMessage ="You can\'t set discount less then 1 and greater then 99")]
        public byte? DiscountPercentage { get; set; }
        public bool? IsActive { get; set; }
        public bool IsCreateDiscount { get; set; } = false;
    }
}
