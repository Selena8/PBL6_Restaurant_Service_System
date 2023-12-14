using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Responses
{
    public class GetIngredientsOfFoodResponse
    {
        public int Seq { get; set; }
        public string Name { get; set; }  = null!;
    }
}