using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FitnessClub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace FitnessClub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly FitnessClubContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(FitnessClubContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("Registration")]
        public async Task<IActionResult> Register([FromBody] RegisterModel request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _context.Users.Where(u => u!.Email == request.Email).FirstOrDefaultAsync();

            if (user is not null) return BadRequest("The user with such email is already exists");

            await _context.Users.AddAsync(new User()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                RoleId = 1,
                BirthDate = request.Birthdate,
            });
            await _context.SaveChangesAsync();

            return Ok("The user has been successfully created");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            User? userFromDb = await _context.Users
                .Include(u => u!.Role)
                .Where(u => u!.Email == request.Email)
                .FirstOrDefaultAsync();

            if (userFromDb is null) return BadRequest("User not found");

            if (!BCrypt.Net.BCrypt.Verify(request.Password, userFromDb.Password)) return BadRequest("Wrong password");

            var token = GenerateToken(userFromDb);
            return Ok(token);
        }

        private string GenerateToken(User? user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim("Id", user!.Id.ToString()),
                new Claim("Role", user.Role!.Title)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTSecretKey"]!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: credentials,
                issuer: "https://localhost:7123",
                audience: "https://localhost:7123"
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            
            return jwt;
        }
    }
}