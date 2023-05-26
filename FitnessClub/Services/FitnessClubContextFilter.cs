using FitnessClub.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;

namespace FitnessClub.Services
{
    public class FitnessClubContextFilter : IAsyncActionFilter
    {
        private readonly FitnessClubContext _context;
        private readonly IConfiguration _configuration;

        public FitnessClubContextFilter(FitnessClubContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var dbContext = context.HttpContext.RequestServices.GetRequiredService<FitnessClubContext>();

            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var authHeader = context.HttpContext.Request.Headers["Authorization"].ToString();

            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
            {
                var token = authHeader.Substring(7);
                var jwtToken = jwtTokenHandler.ReadToken(token) as JwtSecurityToken;
                if (jwtToken != null)
                {
                    var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "Id")?.Value;
                    var user = await dbContext.Users.FindAsync(Convert.ToInt32(userId));
                    if (user == null)
                        throw new Exception("Unable to find the current user in the database");

                    var role = jwtToken.Claims.FirstOrDefault(c => c.Type == "Role")?.Value;

                    var connectionString = _configuration.GetConnectionString(role);

                    if (string.IsNullOrEmpty(connectionString))
                    {
                        throw new Exception("Connection string not found for the user role");
                    }

                    dbContext.Database.SetConnectionString(connectionString);
                }
            }
            await next();
        }


    }
}
