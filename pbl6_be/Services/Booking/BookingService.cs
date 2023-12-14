using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using pbl6_be.Common.Utilities;
using pbl6_be.Common.Utilities.Exceptions;
using pbl6_be.Domain;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Transfers;
using pbl6_be.Transfers.DTOs;
using pbl6_be.Transfers.Requests;
namespace pbl6_be.Services
{
    public class BookingService : IBookingService
    {
        private readonly IMapper _mapper;
        private readonly Context _context;
        private ILogger<BookingService> _logger;
        private IMailService _mailService;

        public BookingService(Context context,
            IMapper mapper,
            ILogger<BookingService> logger,
            IMailService mailService)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
            _mailService = mailService;
        }

        public async Task<Booking> Booking(BookingRequestInfo request)
        {
            _logger.LogInformation("====== Start Create booking \n with  request = {@request} ======", request);
            var tran = _context.Database.BeginTransaction();
            try
            {
                var bookingDate = new BookingTimeRequest()
                {
                    StartTime = new DateTime(request.OrderDate.Year, request.OrderDate.Month, request.OrderDate.Day, request.OrderDate.Hour, request.OrderDate.Minute, request.OrderDate.Second)
                };
                // Check if any table is already booked
                // if (await CheckAvailability(bookingDate)) throw new BadRequestException($"Table with name = '{request.FullName}' already booked or not free");

                var booking = _mapper.Map<BookingRequestInfo, Booking>(request);
                //List table free in this time 
                var listFreeTable = await GetFreeTableByDateTime(request.OrderDate);
                var table = await _context.Tables
                                                .Where(t => listFreeTable.Contains(t.Id) && t.NumberOfSeats >= request.NumberOfPeople)
                                                .FirstOrDefaultAsync();
                // foreach (var item in listFreeTable) System.Console.WriteLine(item);
                //get free table
                if(table == null)
                {
                    throw new BadRequestException("The tables are fully booked. Please choose another time slot");
                }
                booking.TableId = table.Id;
                _context.Entry(booking).State = EntityState.Added;
                _context.Bookings.Add(booking);
                await _context.SaveChangesAsync();
                // send email
                SendMailDto mailContent = new SendMailDto();
                string templatePath = Constants.ROOT_PATH_MAIL_TEMPLATE + "/BookingInfor.html";
                StreamReader str = new StreamReader(templatePath);
                string mailText = str.ReadToEnd();
                mailText = mailText
                 .Replace("[table_id]",table.Name)
                 .Replace("[date]",booking.OrderDate.ToShortDateString() )
                 .Replace("[email]",booking.Email )
                 .Replace("[phone]",booking.PhoneNumber );
                mailContent.To = booking.Email;
                mailContent.Subject = "Reservation Information";
                mailContent.Body = mailText;
                await _mailService.SendConfirmEmail(mailContent);
                tran.Commit();

                return booking;
            }
            catch (System.Exception ex)
            {
                tran.Rollback();
                _logger.LogInformation("Create booking with request = {@request} failed .  Error = {Message} ", request, ex.Message);
                throw;
            }
        }

        public async Task<bool> CheckAvailability(BookingTimeRequest request)
        {
            _logger.LogInformation("====== Start check booking \n with  request = {@info} ======", request);
            try
            {
                return (await GetFreeTableByDateTime(request.StartTime)).Count > 0;// 0 là không có bàn nào free cả
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Check booking time with request = {@request} failed .  Error = {Message} ", request, ex.Message);
                throw;
            }
        }

        public async Task<List<BookingTime>> FreeTime(DateTime request)
        {
            //1.Tìm tất cả các booking trong ngày đó
            //2.Tìm trong múi giờ đó có bàn nào còn free không
            //3.Nếu số booking =  số bàn => không free
            //1.Tìm tất cả các booking trong ngày đó
            var listBookedTime = await _context.Bookings
                .Where(x => x.OrderDate.Date == request.Date)
                .ToListAsync();

            var allTable = await _context.Tables.ToListAsync();
            var countTable = allTable.Count();

            //2.Tìm trong múi giờ đó có bàn nào còn free không
            var listFreeTime = new List<BookingTime>();
            var listBookingTime = GetListTimeBooking(request);
            foreach (var item in listBookingTime)
            {
                var bookingTime = listBookedTime.AsReadOnly()
                    .Where(x => x.OrderDate.AddHours(1) > item.StartTime && x.OrderDate.AddHours(1) < item.EndTime)
                    .ToList()
                    .Count();

                //3.Nếu số booking <  số bàn ==> free
                if (bookingTime < countTable)
                {
                    listFreeTime.Add(item);
                }
            }
            return listFreeTime;
        }

        private List<BookingTime> GetListTimeBooking(DateTime requestTime)
        {
            var listTimeBooking = new List<BookingTime>();
            var startTimeBooking = Constants.OpenTime;
            var endTimeBooking = Constants.OpenTime.Add(Constants.TimeStepBooking);
            var count = (int)((Constants.CloseTime - Constants.OpenTime) / Constants.TimeStepBooking + 1);

            for (int i = 1; i < count; i++)
            {
                listTimeBooking.Add(new BookingTime()
                {
                    StartTime = new DateTime(requestTime.Year, requestTime.Month, requestTime.Day, startTimeBooking.Hours, startTimeBooking.Minutes, startTimeBooking.Seconds).AddSeconds(1),
                    EndTime = new DateTime(requestTime.Year, requestTime.Month, requestTime.Day, startTimeBooking.Hours, startTimeBooking.Minutes, startTimeBooking.Seconds).AddHours(Constants.TimeStepBooking.Hours)
                });

                startTimeBooking = startTimeBooking.Add(Constants.TimeStepBooking);
                endTimeBooking = endTimeBooking.Add(Constants.TimeStepBooking);
            }
            return listTimeBooking;
        }

        /// <summary>
        /// Lấy danh sách các Id bàn đang free tại thời điểm đó
        /// </summary>
        /// <param name="request">Là 1 thời điểm bao gồm ngày-tháng-năm giờ-phút-giây 
        /// truyển vào nhằm mục đích lọc ra những bàn đã book và bàn free</param>
        /// <returns></returns>
        private async Task<List<int>> GetFreeTableByDateTime(DateTime request)
        {
            //1.Lấy tất cả các bàn đã được đặt trong khoảng thời gian đó
            //2.Lấy tất cả các Id bàn
            //3.Lấy phần  giao giữa 2 mảng đó sẽ là danh sách các Id bàn free

            //1.Lấy tất cả các bàn đã được đặt trong khoảng thời gian đó
            var listBookedTableId = await _context.Bookings
                .Where(x => x.OrderDate.AddHours(1) > request.AddSeconds(1) && x.OrderDate.AddHours(1) < request.AddHours(Constants.TimeStepBooking.Hours))
                .Select(x => x.TableId)
                .ToListAsync();

            //2.Lấy tất cả các Id bàn
            var listTableId = await _context.Tables.Select(x => x.Id).ToListAsync();

            // Take part except 2 list 
            // Example
            // arr = [1,2,3]
            // arr2 = [1,2,3,4,5]
            // result = [4,5]

            //3.Lấy phần  giao giữa 2 mảng đó sẽ là danh sách các Id bàn free
            return listTableId.Except(listBookedTableId).Union(listBookedTableId.Except(listTableId)).ToList();
        }
    }
}