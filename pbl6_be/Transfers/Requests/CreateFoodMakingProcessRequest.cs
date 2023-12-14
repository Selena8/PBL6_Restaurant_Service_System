using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Requests
{
    public class CreateFoodMakingProcessRequest
    {
        public int Seq { get; set; }
        public string Description { get; set; } = null!;
    }
}