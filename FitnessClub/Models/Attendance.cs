using System;
using System.Collections.Generic;

namespace FitnessClub.Models;

public partial class Attendance
{
    public int Id { get; set; }

    public DateOnly AttendanceDate { get; set; }

    public int? UserId { get; set; }

    public virtual User? User { get; set; }
}
