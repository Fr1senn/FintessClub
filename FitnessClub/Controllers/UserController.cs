using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessClub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessClub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly FitnessClubContext _context;

        public UserController(FitnessClubContext context)
        {
            _context = context;
        }

        [HttpGet("GetCurrentUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            int userId = Convert.ToInt32(User.FindFirst("Id")?.Value);
            User? user = await _context.Users
                .Include(u => u.Reviews)
                .ThenInclude(r => r.Subscription)
                .Include(u => u.Wishlists)
                .ThenInclude(w => w.Subscription)
                .ThenInclude(s => s!.Discounts)
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null) return BadRequest("User not found");
            return Ok(user);
        }
    }
}