using FitnessClub.Interfaces;
using FitnessClub.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitnessClub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "admin, manager")]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceRepository _attendanceRepository;

        public AttendanceController(IAttendanceRepository attendanceRepository)
        {
            _attendanceRepository = attendanceRepository;
        }

        [HttpGet("GetAttendance")]
        public async Task<IActionResult> GetAttendance()
        {
            List<Attendance> attendances = (await _attendanceRepository.GetAttendances()).ToList();
            return Ok(attendances);
        }

        [HttpGet("GetAttandanceByUser")]
        public async Task<IActionResult> GetAttandanceByUser([FromQuery] string userFirstName, [FromQuery] string userLastName)
        {
            try
            {
                List<Attendance> attendances = (await _attendanceRepository.GetAttendancesByUser(userFirstName, userLastName)).ToList();
                return Ok(attendances);
            }
            catch (NullReferenceException exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpGet("GetAttendanceFromTill")]
        public async Task<IActionResult> GetAttendanceFromTill([FromQuery] DateOnly? attendanceDateFrom, [FromQuery] DateOnly? attendanceDateTill)
        {
            List<Attendance> attendances = (await _attendanceRepository.GetAttendancesFromTill(attendanceDateFrom, attendanceDateTill)).ToList();

            return Ok(attendances);
        }

        [HttpPost("CreateAttendance")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateAttendance([FromBody] int userId)
        {
            try
            {
                await _attendanceRepository.AddAttendance(userId);
                return Ok();
            }
            catch (NullReferenceException exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }
}
