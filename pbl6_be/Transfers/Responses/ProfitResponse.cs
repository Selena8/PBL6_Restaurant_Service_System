using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Responses
{
    public class ProfitResponse
    {
        public List<(string, double)> data {get; set;} 
        public double Total {get; set;}
        public ProfitResponse()
        {
            data = new List<(string, double)>();
        }
        public void Sum()
        {
            Total = data.Sum(x => x.Item2);
        }
    }
}