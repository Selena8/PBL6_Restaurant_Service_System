using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Requests
{
    public class GetProfitRequest
    {
        public GetProfitType Type {get; set;}
        public DateTime Date {get; set;}
    }
    public enum GetProfitType
    {
        LastSevenDays,
        CurrentMonth,
        ByMonth,
        ByYear,
    }
}