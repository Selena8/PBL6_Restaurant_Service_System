using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Responses
{
    public class GetFoodMakingProcessResponse
    {
        public int Seq { get; set; }
        public string Description { get; set; } = null!;
    }
}