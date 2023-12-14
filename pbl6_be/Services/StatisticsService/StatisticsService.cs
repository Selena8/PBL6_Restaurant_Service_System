using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Common;
using Microsoft.EntityFrameworkCore;
using pbl6_be.Domain;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;

namespace pbl6_be.Services
{
    public class StatisticsService : IStatisticsService
    {
        private Context _context;
        public StatisticsService(Context context)
        {
            this._context = context;
        }

        public async Task<BookingStatisticsResponse> GetBookingStatistics(GetBookingStatisticsRequest request)
        {
            var response = new BookingStatisticsResponse();
            List<DateTime> weekends;
            TimeSpan offset = TimeSpan.Parse("07:00");
            DateTime now = DateTimeOffset.UtcNow.ToOffset(offset).DateTime;

            var milestones = new List<(DateTime, DateTime)>();
            switch (request.Type)
            {
                case GetBookingStatisticsType.LastSevenDays:

                    for (var i = 0; i <= 6; ++i)
                    {
                        milestones.Add((now.AddDays(-i), now.AddDays(-i)));
                    }
                    break;
                case GetBookingStatisticsType.CurrentMonth:
                    weekends = GetWeekOfMonth(now);

                    foreach (var d in weekends)
                    {
                        milestones.Add((d, d.AddDays(6)));
                    }
                    break;
                case GetBookingStatisticsType.ByMonth:
                    weekends = GetWeekOfMonth(request.Date);

                    foreach (var d in weekends)
                    {
                        milestones.Add((d, d.AddDays(6)));
                    }
                    break;
                case GetBookingStatisticsType.ByYear:
                    for (var i = 1; i <= 12; ++i)
                    {
                        var newd = new DateTime(request.Date.Year, i, 1);
                        var firstDayOfMonth = new DateTime(newd.Year, newd.Month, 1);
                        var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
                        milestones.Add((firstDayOfMonth, lastDayOfMonth));
                    }
                    break;
            }

            foreach (var milestone in milestones)
            {
                int count = await _context.Bookings.Where(bk =>
                                                         bk.OrderDate >= milestone.Item1 && bk.OrderDate <= milestone.Item2)
                                                        .CountAsync();
                response.data.Add((GetLabel(request.Type, milestone.Item1, milestone.Item2), count));
            }
            response.Sum();
            return response;
        }

        public async Task<int> GetNumberOfOrder(GetNumberOfOrderRequest request)
        {
            var count = await _context.Orders.CountAsync(o => o.OrderTime >= request.StartDate
                                                        && o.OrderTime <= request.EndDate
                                                        );
            return count;
        }

        public async Task<GetPaymentStatisticResponse> GetPaymentStatistics(GetPaymentStatisticRequest request)
        {
            var response = new GetPaymentStatisticResponse();

            var groupByType = _context.Payments.GroupBy(x => new { x.Type, x.Status });
            response.SuccessOnlinePayment = groupByType.Where(x => x.Key.Status == PaymentStatus.Paid
                                                            && x.Key.Type == PaymentType.Online
                                                            ).Select(x => x.Count()).FirstOrDefault();
            response.FailOnlinePayment = groupByType.Where(x => x.Key.Status == PaymentStatus.UnPaid
                                                            && x.Key.Type == PaymentType.Online
                                                            ).Select(x => x.Count()).FirstOrDefault();
            response.SuccessCashPayment = groupByType.Where(x => x.Key.Status == PaymentStatus.Paid
                                                            && x.Key.Type == PaymentType.Cash
                                                            ).Select(x => x.Count()).FirstOrDefault();
            response.FailCashPayment = await groupByType.Where(x => x.Key.Status == PaymentStatus.UnPaid
                                                            && x.Key.Type == PaymentType.Cash
                                                            ).Select(x => x.Count()).FirstOrDefaultAsync();
            response.CashPaymentTotal = response.SuccessCashPayment + response.FailCashPayment;
            response.OnlinePaymentTotal = response.SuccessOnlinePayment + response.FailOnlinePayment;
            return response;
        }

        public async Task<ProfitResponse> GetProfit(GetProfitRequest request)
        {
            var response = new ProfitResponse();
            List<DateTime> weekends;
            TimeSpan offset = TimeSpan.Parse("07:00");
            DateTime now = DateTimeOffset.UtcNow.ToOffset(offset).DateTime;

            var milestones = new List<(DateTime, DateTime)>();
            switch (request.Type)
            {
                case GetProfitType.LastSevenDays:

                    for (var i = 0; i <= 6; ++i)
                    {
                        milestones.Add((now.AddDays(-i), now.AddDays(-i)));
                    }
                    break;
                case GetProfitType.CurrentMonth:
                    weekends = GetWeekOfMonth(now);

                    foreach (var d in weekends)
                    {
                        milestones.Add((d, d.AddDays(6)));
                    }
                    break;
                case GetProfitType.ByMonth:
                    weekends = GetWeekOfMonth(request.Date);

                    foreach (var d in weekends)
                    {
                        milestones.Add((d, d.AddDays(6)));
                    }
                    break;
                case GetProfitType.ByYear:
                    for (var i = 1; i <= 12; ++i)
                    {
                        var newd = new DateTime(request.Date.Year, i, 1);
                        var firstDayOfMonth = new DateTime(newd.Year, newd.Month, 1);
                        var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
                        milestones.Add((firstDayOfMonth, lastDayOfMonth));
                    }
                    break;
            }

            foreach (var milestone in milestones)
            {
                decimal profit = await _context.Payments.Where(pm => pm.Status == PaymentStatus.Paid
                                                        && (pm.PaymentDate >= milestone.Item1 && pm.PaymentDate <= milestone.Item2))
                                                        .SumAsync(pm => pm.TotalAmount);
                response.data.Add((GetLabel(request.Type, milestone.Item1, milestone.Item2), Convert.ToDouble(profit)));
            }
            response.Sum();
            return response;
        }

        public async Task<GetWorkHourOfStaffResponse> GetWorkHourOfStaff(GetWorkHourOfStaffRequest request)
        {
            var response = new GetWorkHourOfStaffResponse();
            var groupby = await _context.Shifts
                                .Include(s => s.WorkLog)
                                .Include(s => s.User)
                                .GroupBy(s => s.UserId)
                                .Select(g => new {
                                                Name = g.Select(s => s.User.FirstName + " " + s.User.LastName).FirstOrDefault(), 
                                                Sum = g.Sum(s => s.WorkLog == null ? 0 : s.WorkLog.TotalTime)
                                                }
                                        )
                                .ToListAsync();
            foreach(var i in groupby)
            {
                response.data.Add((i.Name,i.Sum));
            }
            return response;
        }

        private string GetLabel(GetProfitType type, DateTime start, DateTime end)
        {
            switch (type)
            {
                case GetProfitType.LastSevenDays:
                    return start.ToString("MM/dd");
                case GetProfitType.CurrentMonth:
                    return start.ToString("MM/dd") + "-" + end.ToString("MM/dd");
                case GetProfitType.ByMonth:
                    return start.ToString("MM/dd") + "-" + end.ToString("MM/dd");
                case GetProfitType.ByYear:
                    return "Tháng: " + start.ToString("MM");
            }
            return "";
        }

        private string GetLabel(GetBookingStatisticsType type, DateTime start, DateTime end)
        {
            switch (type)
            {
                case GetBookingStatisticsType.LastSevenDays:
                    return start.ToString("MM/dd");
                case GetBookingStatisticsType.CurrentMonth:
                    return start.ToString("MM/dd") + "-" + end.ToString("MM/dd");
                case GetBookingStatisticsType.ByMonth:
                    return start.ToString("MM/dd") + "-" + end.ToString("MM/dd");
                case GetBookingStatisticsType.ByYear:
                    return "Tháng: " + start.ToString("MM");
            }
            return "";
        }

        private List<DateTime> GetWeekOfMonth(DateTime month)
        {
            // first generate all dates in the month of 'date'
            var dates = Enumerable.Range(1, DateTime.DaysInMonth(month.Year, month.Month)).Select(n => new DateTime(month.Year, month.Month, n));
            // then filter the only the start of weeks
            var weekends = from d in dates
                           where d.DayOfWeek == DayOfWeek.Monday
                           select d;
            return weekends.ToList();
        }
    }
}