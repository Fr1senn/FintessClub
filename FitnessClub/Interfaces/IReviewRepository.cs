using FitnessClub.Models;
using FitnessClub.Models.DTOs;

namespace FitnessClub.Interfaces
{
    public interface IReviewRepository
    {
        Task EditReview(Review review, int userId);
        Task DeleteReview(int reviewId);
        Task CreateReview(ReviewDTO reviewDTO, int userId);
    }
}
