using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Responses
{
    public class BookingStatisticsResponse
    {
        public List<(string, int)> data {get; set;} 
        public int Total {get; set;}
        public BookingStatisticsResponse()
        {
            data = new List<(string, int)>();
        }
        public void Sum()
        {
            Total = data.Sum(x => x.Item2);
        }
    }
}