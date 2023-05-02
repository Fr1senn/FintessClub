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
    [Authorize(Roles = "admin")]
    public class AttendanceController : ControllerBase
    {
        private readonly FitnessClubContext _context;

        public AttendanceController(FitnessClubContext context)
        {
            _context = context;
        }

        [HttpGet("GetAttendances")]
        public async Task<IActionResult> GetAttendances()
        {
            var attendances = await _context.Attendances
                .Include(a => a.User)
                .AsNoTracking()
                .ToListAsync();
            return Ok(attendances);
        }
    }
}