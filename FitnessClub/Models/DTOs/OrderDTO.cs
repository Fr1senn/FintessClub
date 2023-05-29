using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessClub.Models
{
    public class OrderDTO
    {
        public int UserId { get; set; }
        public int SubscriptionId { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "You can't set the subscription duration to less than 1 day")]
        public int DaysAmount { get; set; }
    }
}