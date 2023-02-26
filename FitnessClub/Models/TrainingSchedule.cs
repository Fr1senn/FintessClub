using System;
using System.Collections.Generic;

namespace FitnessClub.Models;

public partial class TrainingSchedule
{
    public int Id { get; set; }

    public DateOnly TrainingDate { get; set; }

    public int? UserId { get; set; }

    public int? ExerciseId { get; set; }

    public virtual Exercise? Exercise { get; set; }

    public virtual User? User { get; set; }
}
