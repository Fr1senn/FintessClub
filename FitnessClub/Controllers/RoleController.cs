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
    public class RoleController : ControllerBase
    {
        private readonly FitnessClubContext _context;

        public RoleController(FitnessClubContext context)
        {
            _context = context;
        }

        [HttpGet("GetRoles")]
        public async Task<IActionResult> GetRoles()
        {
            List<Role> roles = await _context.Roles
                .AsNoTracking()
                .ToListAsync();
            return Ok(roles);
        }
    }
}
