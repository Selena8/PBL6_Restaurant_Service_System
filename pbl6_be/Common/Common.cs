using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using pbl6_be.Common.Utilities;

namespace pbl6_be.Common
{
    public static class Common
    {
        public static List<TimeSpan> GetListTimeBooking()
        {
            var listTimeBooking = new List<TimeSpan>();
            var timeBooking = Constants.OpenTime; 
            while (Constants.OpenTime < Constants.CloseTime && timeBooking < Constants.OpenTime)
            {
                listTimeBooking.Add(timeBooking);
                timeBooking.Add(Constants.TimeStepBooking);
            }

            return listTimeBooking;
        }
    }
}