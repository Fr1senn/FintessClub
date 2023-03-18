using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessClub.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessClub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly FitnessClubContext _context;

        public ReviewController(FitnessClubContext context)
        {
            _context = context;
        }

        [HttpPatch("Edit")]
        public async Task<IActionResult> Edit([FromBody] Review review)
        {
            Review? reviewFromDB = await _context.Reviews.AsNoTracking().FirstOrDefaultAsync(r => r.Id == review.Id);
            if (reviewFromDB is null) return BadRequest("Couldn't find review");

            int userId = Convert.ToInt32(HttpContext.User.FindFirst("id")!.Value);
            if (review.UserId != userId) return Unauthorized("Inappropriate user");

            review.ReviewDate = reviewFromDB.ReviewDate;

            _context.Reviews.Update(review);
            await _context.SaveChangesAsync();

            return Ok("Review has been successfully updated");
        }
    }
}
