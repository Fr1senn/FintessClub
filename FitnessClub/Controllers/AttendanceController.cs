using System.IdentityModel.Tokens.Jwt;
using FitnessClub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessClub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "admin, manager")]
    public class AttendanceController : ControllerBase
    {
        private readonly FitnessClubContext _context;

        public AttendanceController(FitnessClubContext context)
        {
            _context = context;
        }

        [HttpGet("GetAttendance")]
        public async Task<IActionResult> GetAttendance()
        {
            List<Attendance> attendance = await _context.Attendances
                .Include(a => a.User)
                .AsNoTracking()
                .ToListAsync();
            return Ok(attendance);
        }

        [HttpGet("GetAttandanceByUser")]
        public async Task<IActionResult> GetAttandanceByUser([FromQuery] string userFirstName, [FromQuery] string userLastName)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.FirstName == userFirstName && u.LastName == userLastName);
            if (user is null) return BadRequest();
            List<Attendance> attendance = await _context.Attendances
                .Include(a => a.User)
                .Where(a => a.User.Id == user.Id)
                .AsNoTracking()
                .ToListAsync();
            return Ok(attendance);
        }

        [HttpGet("GetAttendanceFromTill")]
        public async Task<IActionResult> GetAttendanceFromTill([FromQuery] DateOnly? attendanceDateFrom, [FromQuery] DateOnly? attendanceDateTill)
        {
            attendanceDateFrom ??= DateOnly.MinValue;
            attendanceDateTill ??= DateOnly.MaxValue;

            List<Attendance> attendance = await _context.Attendances
                .Include(a => a.User)
                .Where(a => a.AttendanceDate >= attendanceDateFrom && a.AttendanceDate <= attendanceDateTill)
                .AsNoTracking()
                .ToListAsync();

            return Ok(attendance);
        }

        [HttpPost("CreateAttendance")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateAttendance([FromBody] int userId)
        {
            User? user = await _context.Users.FindAsync(userId);

            if (user is null) return BadRequest();

            Attendance attendance = new Attendance()
            {
                UserId = userId,
            };

            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
