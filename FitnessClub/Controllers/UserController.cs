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
                .Include(u => u.Orders)
                .ThenInclude(o => o.Subscription)
                .Include(u => u.Attendances.OrderByDescending(a => a.AttendanceDate).Take(1))
                .Include(u => u.Role)
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null) return BadRequest("User not found");
            return Ok(user);
        }

        [HttpPatch("UpdateUserCredentials")]
        public async Task<IActionResult> UpdateUserCredentials([FromBody] UpdateCredentialsModel updateCredentialsModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            int id = Convert.ToInt32(HttpContext.User.FindFirst("id")!.Value);
            User? currentUserCredentials = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            User? user = await _context.Users
                .Where(u => u.Email == updateCredentialsModel.Email && u.Email != currentUserCredentials!.Email)
                .FirstOrDefaultAsync();

            if (user is not null)
                if (user.Email == updateCredentialsModel.Email)
                    return BadRequest("The user with such email is already exists");
            
            user = currentUserCredentials;
            user!.Email = updateCredentialsModel.Email;
            
            if (!String.IsNullOrEmpty(updateCredentialsModel.Password))
                user!.Password = BCrypt.Net.BCrypt.HashPassword(updateCredentialsModel.Password);
            
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}