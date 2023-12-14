using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Responses
{
    public class GetWorkHourOfStaffResponse
    {
         public List<(string, double)> data {get; set;} 

         public GetWorkHourOfStaffResponse()
         {
            data = new List<(string, double)>();
         }
    }
}