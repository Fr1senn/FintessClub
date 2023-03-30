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

        [HttpPost("ToggleWishlistItem")]
        public async Task<IActionResult> ToggleWishlistItem([FromBody] WishlistData wishlistData)
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
        public async Task<IActionResult> UpdateWishlistItem([FromBody] WishlistData wishlistData)
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