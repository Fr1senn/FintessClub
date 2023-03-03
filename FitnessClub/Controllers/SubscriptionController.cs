using FitnessClub.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessClub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly FitnessClubContext _context;

        public SubscriptionController(FitnessClubContext context)
        {
            _context = context;
        }
    }
}
