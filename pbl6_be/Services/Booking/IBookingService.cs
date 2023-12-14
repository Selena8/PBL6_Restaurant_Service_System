using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Transfers;
using pbl6_be.Transfers.Requests;

namespace pbl6_be.Services
{
    public interface IBookingService
    {
        Task<Booking> Booking(BookingRequestInfo info);
        Task<bool> CheckAvailability(BookingTimeRequest request);
        Task<List<BookingTime>> FreeTime(DateTime request);
    }
}