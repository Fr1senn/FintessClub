using FitnessClub.Interfaces;
using FitnessClub.Models;
using Microsoft.EntityFrameworkCore;

namespace FitnessClub.Repositories
{
    public class AttendanceRepository : IAttendanceRepository
    {
        private readonly FitnessClubContext _context;

        public AttendanceRepository(FitnessClubContext context)
        {
            _context = context;
        }

        public async Task AddAttendance(int userId)
        {
            User? user = await _context.Users.FindAsync(userId);

            if (user is null)
            {
                throw new NullReferenceException("User does not exist");
            }

            Attendance attendance = new Attendance()
            {
                UserId = userId,
            };
            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Attendance>> GetAttendances()
        {
            List<Attendance> attendance = await _context.Attendances
                .Include(a => a.User)
                .AsNoTracking()
                .ToListAsync();
            return attendance;
        }

        public async Task<IEnumerable<Attendance>> GetAttendancesByUser(string userFirstName, string userLastName)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.FirstName == userFirstName && u.LastName == userLastName);
            if (user is null)
            {
                throw new NullReferenceException("User does not exist");
            }

            List<Attendance> attendance = await _context.Attendances
                .Include(a => a.User)
                .Where(a => a.User.Id == user.Id)
                .AsNoTracking()
                .ToListAsync();
            return attendance;
        }

        public async Task<IEnumerable<Attendance>> GetAttendancesFromTill(DateOnly? attendanceDateFrom, DateOnly? attendanceDateTill)
        {
            attendanceDateFrom ??= DateOnly.MinValue;
            attendanceDateTill ??= DateOnly.MaxValue;

            List<Attendance> attendance = await _context.Attendances
                .Include(a => a.User)
                .Where(a => a.AttendanceDate >= attendanceDateFrom && a.AttendanceDate <= attendanceDateTill)
                .AsNoTracking()
                .ToListAsync();
            return attendance;
        }
    }
}
