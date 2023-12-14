using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;

namespace pbl6_be.Services
{
    public interface IStatisticsService
    {
        Task<ProfitResponse> GetProfit(GetProfitRequest request);
        Task<GetPaymentStatisticResponse> GetPaymentStatistics(GetPaymentStatisticRequest request);
        Task<int> GetNumberOfOrder(GetNumberOfOrderRequest request);
        Task<BookingStatisticsResponse> GetBookingStatistics(GetBookingStatisticsRequest request);
        Task<GetWorkHourOfStaffResponse> GetWorkHourOfStaff(GetWorkHourOfStaffRequest request);
    }
}