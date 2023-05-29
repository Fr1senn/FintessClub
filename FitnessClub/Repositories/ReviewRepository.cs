using FitnessClub.Interfaces;
using FitnessClub.Models;
using FitnessClub.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FitnessClub.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly FitnessClubContext _context;

        public ReviewRepository(FitnessClubContext context)
        {
            _context = context;
        }

        public async Task CreateReview(ReviewDTO reviewDTO, int userId)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user is null)
                throw new NullReferenceException("User does not exist");
            Review review = new Review()
            {
                ReviewText = reviewDTO.ReviewText,
                UserId = userId,
                SubscriptionId = reviewDTO.SubscriptionId,
                Estimation = reviewDTO.Estimation
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteReview(int reviewId)
        {
            Review? review = await _context.Reviews.FindAsync(reviewId);

            if (review is null)
                throw new NullReferenceException("Review does not exist");

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
        }

        public async Task EditReview(Review review, int userId)
        {
            Review? reviewFromDB = await _context.Reviews.AsNoTracking().FirstOrDefaultAsync(r => r.Id == review.Id);
            if (reviewFromDB is null)
                throw new NullReferenceException("Review does not exist");

            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user is null)
                throw new NullReferenceException("user does not exist");

            if (review.UserId != user.Id)
                throw new InvalidOperationException("Invalid user for the review");

            review.ReviewDate = reviewFromDB.ReviewDate;

            _context.Reviews.Update(review);
            await _context.SaveChangesAsync();
        }
    }
}
