using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Services;
using pbl6_be.Transfers;
using pbl6_be.Transfers.Requests;

namespace Namespace
{
    [Route("api/booking")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet("free-time")]
        public async Task<List<object>> GetFreeTime([Required][FromQuery] DateTime request)
        {
            return (await _bookingService.FreeTime(request)).Select(bk => new {
                                                                        StartTime = bk.StartTime.ToString("HH:mm"),
                                                                        EndTime = bk.EndTime.ToString("HH:mm")
                                                                        }
                                                                    ).Cast<object>()
                                                                    .ToList();
        }

        [HttpPost("check-availability")]
        public async Task<ActionResult<bool>> CheckAvailability([FromBody] BookingTimeRequest request)
        {
            return await _bookingService.CheckAvailability(request);
        }

        [HttpPost]
        public async Task<IActionResult> Booking([FromBody] BookingRequestInfo request)
        {
            return Ok(await _bookingService.Booking(request));
        }
    }
}