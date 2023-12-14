using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Requests
{
    public class CreateIngredientsOfFoodRequest
    {
        public int Seq { get; set; }
        public string Name { get; set; } = null!;
    }
}