using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessClub.Interfaces;
using FitnessClub.Models;
using FitnessClub.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessClub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReviewController : ControllerBase
    {
        private readonly FitnessClubContext _context;
        private readonly IReviewRepository _reviewRepository;

        public ReviewController(FitnessClubContext context, IReviewRepository reviewRepository)
        {
            _context = context;
            _reviewRepository = reviewRepository;
        }

        [HttpPatch("Edit")]
        public async Task<IActionResult> EditReview([FromBody] Review review)
        {
            try
            {
                int userId = Convert.ToInt32(HttpContext.User.FindFirst("id")!.Value);
                await _reviewRepository.EditReview(review, userId);
                return Ok();
            }
            catch (NullReferenceException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteReview([FromBody] int reviewId)
        {
            try
            {
                await _reviewRepository.DeleteReview(reviewId);
                return Ok();
            }
            catch (NullReferenceException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateReview([FromBody] ReviewDTO reviewDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                int userId = Convert.ToInt32(HttpContext.User.FindFirst("id")!.Value);
                await _reviewRepository.CreateReview(reviewDTO, userId);
                return Ok();
            }
            catch (NullReferenceException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
