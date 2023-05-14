using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpGet("GetUsers")]
        [Authorize(Roles = "admin, manager")]
        public async Task<IActionResult> GetUsers()
        {
            List<User> users = await _context.Users
                .Include(u => u.Role)
                .AsNoTracking()
                .ToListAsync();

            return Ok(users);
        }

        [HttpGet("GetUsersByBirthDateFromTill")]
        [Authorize(Roles = "admin, manager")]
        public async Task<IActionResult> GetUsersByBirthDateFromTill([FromQuery] DateOnly? birthDateFrom, [FromQuery] DateOnly? birthDateTill)
        {
            birthDateFrom ??= DateOnly.MinValue;
            birthDateTill ??= DateOnly.MaxValue;

            List<User> users = await _context.Users
                .Include(u => u.Role)
                .Where(u => u.BirthDate >= birthDateFrom && u.BirthDate <= birthDateTill)
                .AsNoTracking()
                .ToListAsync();

            return Ok(users);
        }

        [HttpGet("GetUsersByRegistrationDateFromTill")]
        [Authorize(Roles = "admin, manager")]
        public async Task<IActionResult> GetUsersByRegistrationDateFromTill([FromQuery] DateOnly? registrationDateFrom, [FromQuery] DateOnly? registrationDateTill)
        {
            registrationDateFrom ??= DateOnly.MinValue;
            registrationDateTill ??= DateOnly.MaxValue;

            List<User> users = await _context.Users
                .Include(u => u.Role)
                .Where(u => u.RegistrationDate >= registrationDateFrom && u.RegistrationDate <= registrationDateTill)
                .AsNoTracking()
                .ToListAsync();

            return Ok(users);
        }

        [HttpGet("GetUsersByEmail")]
        [Authorize(Roles = "admin, manager")]
        public async Task<IActionResult> GetUsersByEmail([FromQuery] string userEmail)
        {
            if (string.IsNullOrEmpty(userEmail)) return BadRequest();

            List<User> users = await _context.Users
                .Include(u => u.Role)
                .Where(u => u.Email.Contains(userEmail))
                .AsNoTracking()
                .ToListAsync();

            return Ok(users);
        }

        [HttpDelete("DeleteUser")]
        [Authorize(Roles = "admin, manager")]
        public async Task<IActionResult> DeleteUser([FromQuery] int userId)
        {
            User? user = await _context.Users
                .Include(u => u.Reviews)
                .Include(u => u.Wishlists)
                .Include(u => u.Orders)
                .Include(u => u.Attendances)
                .Include(u => u.TrainingSchedules)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null) return BadRequest();

            _context.Reviews.RemoveRange(user.Reviews);
            _context.Wishlists.RemoveRange(user.Wishlists);
            _context.Orders.RemoveRange(user.Orders);
            _context.Attendances.RemoveRange(user.Attendances);
            _context.TrainingSchedules.RemoveRange(user.TrainingSchedules);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPatch("UpdateUserRole")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> UpdateUserRole([FromBody] UserRoleDTO userRoleDTO)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userRoleDTO.UserId);
            Role? role = await _context.Roles.FirstOrDefaultAsync(r => r.Id == userRoleDTO.RoleId);

            if (user is null) return BadRequest();
            if (role is null) return BadRequest();

            user.RoleId = role.Id;

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}