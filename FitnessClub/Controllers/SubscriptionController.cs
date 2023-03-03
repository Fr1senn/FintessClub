using FitnessClub.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessClub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly FitnessClubContext _context;

        public SubscriptionController(FitnessClubContext context)
        {
            _context = context;
        }

        [HttpGet("GetSubscriptions")]
        public async Task<IActionResult> GetSubscriptions()
        {
            List<Subscription> subscriptions = await _context.Subscriptions
                .Include(s => s.Discounts)
                .ToListAsync();
            return Ok(subscriptions);
        }
    }
}