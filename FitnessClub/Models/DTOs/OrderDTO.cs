using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessClub.Models
{
    public class OrderDTO
    {
        public int UserId { get; set; }
        public int SubscriptionId { get; set; }
        public int DaysAmount { get; set; }
    }
}