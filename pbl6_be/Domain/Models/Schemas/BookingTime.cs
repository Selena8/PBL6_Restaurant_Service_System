using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Domain.Models.Schemas
{
    public class BookingTime
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    
        // override object.Equals
        public override bool Equals(object obj)
        {
            //
            // See the full list of guidelines at
            //   http://go.microsoft.com/fwlink/?LinkID=85237
            // and also the guidance for operator== at
            //   http://go.microsoft.com/fwlink/?LinkId=85238
            //
            var bookingTime = obj as BookingTime;
            if (bookingTime == null || GetType() != bookingTime.GetType())
            {
                return false;
            }
            
            return this.StartTime == bookingTime.StartTime && this.EndTime == bookingTime.EndTime;
        }
        
        // override object.GetHashCode
        public override int GetHashCode()
        {
            return this.StartTime.GetHashCode();
        }
    }
}