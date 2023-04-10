using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessClub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessClub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly FitnessClubContext _context;

        public OrderController(FitnessClubContext context)
        {
            _context = context;
        }

        [HttpPost("BuySubscription")]
        public async Task<IActionResult> BuySubscription([FromBody] OrderDTO orderData)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (orderData.DaysAmount < 1)
                return BadRequest("You can't set the subscription duration to less than 1 day");

            Subscription? subscription = await _context.Subscriptions.FindAsync(orderData.SubscriptionId);
            if (subscription is null) return BadRequest("There is no such subscription");

            User? user = await _context.Users
                .Include(u => u.Orders)
                .FirstOrDefaultAsync(u => u.Id == orderData.UserId);
            if (user is null) return BadRequest("Such user does not exist");

            if (user.Orders.FirstOrDefault(o =>
                    o.SubscriptionId == orderData.SubscriptionId && o.UserId == orderData.UserId) is not null)
            {
                var currentDate = DateTime.Now;
                var expirationDate = currentDate.AddDays(orderData.DaysAmount);
                if (currentDate < expirationDate) return BadRequest("You already have this subscription");
            }

                await _context.Orders.AddAsync(new Order
                {
                    UserId = orderData.UserId,
                    SubscriptionId = orderData.SubscriptionId,
                    DaysAmount = orderData.DaysAmount
                });

            Wishlist? wishlist = await _context.Wishlists
                .FirstOrDefaultAsync(w => w.UserId == orderData.UserId && w.SubscriptionId == orderData.SubscriptionId);

            if (wishlist is not null) _context.Remove(wishlist);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}