using System.ComponentModel.DataAnnotations;

namespace FitnessClub.Models.DTOs
{
    public class ReviewDTO
    {
        [MinLength(3)]
        public string ReviewText { get; set; }
        [Range(1, 5)]
        public short Estimation { get; set; }
        public int SubscriptionId { get;set; }
    }
}
