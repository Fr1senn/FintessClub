using FitnessClub.Models;

namespace FitnessClub.Interfaces
{
    public interface IAttendanceRepository
    {
        Task<IEnumerable<Attendance>> GetAttendances();
        Task<IEnumerable<Attendance>> GetAttendancesByUser(string userFirstName, string userLastName);
        Task<IEnumerable<Attendance>> GetAttendancesFromTill(DateOnly? attendanceDateFrom, DateOnly? attendanceDateTill);
        Task AddAttendance(int userId);
    }
}
