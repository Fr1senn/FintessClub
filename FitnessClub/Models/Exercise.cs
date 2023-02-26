using System;
using System.Collections.Generic;

namespace FitnessClub.Models;

public partial class Exercise
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public virtual ICollection<TrainingSchedule> TrainingSchedules { get; } = new List<TrainingSchedule>();
}
