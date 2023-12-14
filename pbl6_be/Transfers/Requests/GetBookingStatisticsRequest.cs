using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Requests
{
    public class GetBookingStatisticsRequest
    {
        public GetBookingStatisticsType Type {get; set;}
        public DateTime Date {get; set;}
    }
    public enum GetBookingStatisticsType
    {
        LastSevenDays,
        CurrentMonth,
        ByMonth,
        ByYear,
    }
}