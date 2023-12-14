using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using pbl6_be.Services;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;

namespace pbl6_be.Api.Controllers
{
    [Route("api/statistics")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private IStatisticsService _StatisticsService;
        public StatisticsController(IStatisticsService StatisticsService)
        {
            this._StatisticsService = StatisticsService;
        }

        [HttpGet("get-profit")]
        public async Task<ActionResult<ProfitResponse>> GetProfit([FromQuery] GetProfitRequest request)
        {
            var result = await _StatisticsService.GetProfit(request);
            return result;
        }

        [HttpGet("get-booking-statistics")]
        public async Task<ActionResult<BookingStatisticsResponse>> GetBookingStatistics([FromQuery] GetBookingStatisticsRequest request)
        {
            var result = await _StatisticsService.GetBookingStatistics(request);
            return result;
        }

        [HttpGet("get-number-of-order")]
        public async Task<ActionResult<int>> GetNumberOfOrder([FromQuery] GetNumberOfOrderRequest request)
        {
            var result = await _StatisticsService.GetNumberOfOrder(request);
            return result;
        }

        [HttpGet("get-payment-statistics")]
        public async Task<ActionResult<GetPaymentStatisticResponse>> GetPaymentStatistics([FromQuery] GetPaymentStatisticRequest request)
        {
            var result = await _StatisticsService.GetPaymentStatistics(request);
            return result;
        }

        [HttpGet("get-worked-hours-of-staff")]
        public async Task<ActionResult<GetWorkHourOfStaffResponse>> GetWorkHourOfStaff([FromQuery] GetWorkHourOfStaffRequest request)
        {
            var result = await _StatisticsService.GetWorkHourOfStaff(request);
            return result;
        }
    }
}