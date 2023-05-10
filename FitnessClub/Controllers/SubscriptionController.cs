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
                .Include(s => s.Reviews)
                .ThenInclude(r => r.User)
                .AsNoTracking()
                .ToListAsync();
            return Ok(subscriptions);
        }

        [HttpGet("{id:}")]
        public async Task<IActionResult> GetSubscription(int id)
        {
            Subscription? subscription = await _context.Subscriptions
                .Include(s => s.Reviews)
                .Include(s => s.Discounts)
                .FirstOrDefaultAsync(s => s.Id == id);
            return Ok(subscription);
        }

        [HttpGet("GetSubscriptionsBySearchedValue")]
        public async Task<IActionResult> GetSubscriptionsBySearchedValue(string subscriptionTitle)
        {
            return Ok(await _context.Subscriptions
                .Include(s => s.Discounts)
                .Include(s => s.Reviews)
                .ThenInclude(r => r.User)
                .AsNoTracking()
                .Where(s => s.Title.ToLower().Contains(subscriptionTitle.ToLower()))
                .ToListAsync());
        }

        [HttpPost("UpdateSubscription")]
        public async Task<IActionResult> UpdateSubscription([FromBody] SubscriptionDTO subscriptionDTO)
        {
            Subscription? subscription = await _context.Subscriptions
                .Include(s => s.Discounts)
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == subscriptionDTO.Id);

            if (subscription is null) return NotFound();

            if (subscriptionDTO.Title is not null)
            {
                subscription.Title = subscriptionDTO.Title;
            }
            if (subscriptionDTO.PricePerDay is not null)
            {
                subscription.PricePerDay = (decimal)subscriptionDTO.PricePerDay;
            }

            if (subscription.Discounts.Count == 0)
            {
                if (subscriptionDTO.DiscountPercentage is not null && subscriptionDTO.IsActive is not null)
                {
                    _context.Discounts.Add(new Discount
                    {
                        SubscriptionId = subscriptionDTO.Id,
                        DiscountPercentage = (decimal)subscriptionDTO.DiscountPercentage,
                        IsActive = (bool)subscriptionDTO.IsActive
                    });
                }
            }

            if (subscription.Discounts is not null && subscription.Discounts.Any())
            {
                foreach (var discount in subscription.Discounts)
                {
                    if (subscriptionDTO.DiscountPercentage is not null)
                    {
                        discount.DiscountPercentage = (decimal)subscriptionDTO.DiscountPercentage;
                    }
                    if (subscriptionDTO.IsActive is not null)
                    {
                        discount.IsActive = (bool)subscriptionDTO.IsActive;
                    }

                    _context.Discounts.Update(discount);
                }
            }

            _context.Subscriptions.Update(subscription);
            await _context.SaveChangesAsync();

            return Ok(subscription);
        }

        [HttpPost("CreateSubscription")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateSubscription([FromBody] SubcriptionWithNewDiscountDTO subscriptionDTO)
        {
            if (subscriptionDTO is null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest();

            Subscription subscription = new Subscription()
            {
                Title = subscriptionDTO.Title,
                PricePerDay = subscriptionDTO.PricePerDay
            };
            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();

            if (subscriptionDTO.IsCreateDiscount)
            {
                Discount discount = new Discount()
                {
                    IsActive = subscriptionDTO.IsActive ?? false,
                    DiscountPercentage = subscriptionDTO.DiscountPercentage ?? 1m,
                    SubscriptionId = subscription.Id
                };
                _context.Discounts.Add(discount);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }
    }
}