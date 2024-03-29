using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessClub.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessClub.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WishlistController : ControllerBase
    {
        private readonly FitnessClubContext _context;

        public WishlistController(FitnessClubContext context)
        {
            _context = context;
        }

        [HttpPost("ToggleWishlistItem")]
        public async Task<IActionResult> ToggleWishlistItem([FromBody] WishlistDTO wishlistData)
        {
            if (wishlistData.SubscriptionDuration < 1)
                return BadRequest("You can't set the subscription duration to less than 1 day");

            Subscription? subscription = await _context.Subscriptions.FindAsync(wishlistData.SubscriptionId);
            if (subscription is null)
                return BadRequest("There is no product with such Id");

            int id = Convert.ToInt32(HttpContext.User.FindFirst("Id")!.Value);
            User? currentUser =
                await _context.Users.Include(u => u.Wishlists).AsNoTracking().FirstAsync(u => u.Id == id);
            Wishlist? wishlistItem =
                currentUser.Wishlists.FirstOrDefault(w => w.SubscriptionId == wishlistData.SubscriptionId);
            if (wishlistItem is null)
                await _context.Wishlists.AddAsync(new Wishlist
                {
                    UserId = currentUser.Id,
                    SubscriptionId = wishlistData.SubscriptionId,
                    DaysAmount = wishlistData.SubscriptionDuration
                });
            else
                _context.Wishlists.Remove(wishlistItem);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPatch("UpdateWishlistItem")]
        public async Task<IActionResult> UpdateWishlistItem([FromBody] WishlistDTO wishlistData)
        {
            if (wishlistData.SubscriptionDuration < 1)
                return BadRequest("You can't set the subscription duration to less than 1 day");

            Subscription? subscription = await _context.Subscriptions.FindAsync(wishlistData.SubscriptionId);
            if (subscription is null)
                return BadRequest("There is no product with such Id");

            int id = Convert.ToInt32(HttpContext.User.FindFirst("Id")!.Value);
            User? currentUser =
                await _context.Users.Include(u => u.Wishlists).AsNoTracking().FirstAsync(u => u.Id == id);
            Wishlist? wishlistItem =
                currentUser.Wishlists.FirstOrDefault(w => w.Id == wishlistData.Id);

            wishlistItem!.DaysAmount = wishlistData.SubscriptionDuration;
            wishlistItem.SubscriptionId = wishlistData.SubscriptionId;

            _context.Wishlists.Update(wishlistItem);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}