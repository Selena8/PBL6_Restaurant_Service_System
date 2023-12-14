using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using pbl6_be.Common.Utilities.Exceptions;
using pbl6_be.Domain;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Extensions;
using pbl6_be.Transfers;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using Trouble_Resolving_SystemBackEnd.Extensions;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Services
{
    public class ShiftService : IShiftService
    {
        private readonly IMapper _mapper;
        private ILogger<ShiftService> _logger;
        private readonly Context _context;

        public ShiftService(Context context,
            IMapper mapper,
            ILogger<ShiftService> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<WorkLog> CheckIn(int user_id, int shift_id)
        {
            //check existed user
            var existedUser = await _context.Users.FirstOrDefaultAsync(user => user.Id == user_id);
            if (existedUser is null)
            {
                _logger.LogInformation("create Work log User_id = {@id} failed: User not found", user_id);
                throw new NotFoundException("User not found by Id: " + user_id);
            }

            //check existed shift
            var existedShift = await _context.Shifts.FirstOrDefaultAsync(shift => shift.Id == shift_id);
            var currentShift = await GetCurrentShift(user_id);
            if (currentShift != null)
            {
                if (currentShift.Id != shift_id)
                {
                    throw new BadRequestException("Shift is not valid");
                }
            }
            else
            {
                throw new BadRequestException("Shift is not valid");
            }
            if (existedShift is null)
            {
                _logger.LogInformation("create Work log Shift_id = {@id} failed: Shift not found", shift_id);
                throw new NotFoundException("Shift not found by Id: " + shift_id);
            }

            //check existed work log
            if (await _context.WorkLogs.FirstOrDefaultAsync(wl => wl.ShiftId == existedShift.Id) != null)
            {
                _logger.LogInformation("You have checked in");
                throw new NotFoundException("You have checked in");
            }

            _logger.LogInformation("====== Start Create request table \n ======");
            var tran = _context.Database.BeginTransaction();

            try
            {
                TimeSpan offset = TimeSpan.Parse("7:00");
                DateTimeOffset now = DateTimeOffset.UtcNow.ToOffset(offset);
                var workLog = new WorkLog();
                if (now.DateTime < existedShift.StartTime)
                {
                    workLog.CheckInTime = existedShift.StartTime;
                }
                else
                {
                    workLog.CheckInTime = now.DateTime;
                }
                workLog.UserId = user_id;
                workLog.MacAddress = "";
                workLog.ShiftId = shift_id;
                workLog.TotalTime = 0;

                _context.WorkLogs.Add(workLog);
                _context.Entry(workLog).State = EntityState.Added;
                await _context.SaveChangesAsync();
                tran.Commit();

                return workLog;
            }
            catch (System.Exception ex)
            {
                tran.Rollback();
                _logger.LogInformation("Check in with shift_id = {@shift_id} failed .  Error = {Message} ", shift_id, ex.Message);
                throw new NotFoundException(ex.Message);
            }
        }

        public async Task<WorkLog> CheckOut(int user_id, int shift_id)
        {
            //check existed user
            var existedUser = await _context.Users.FirstOrDefaultAsync(user => user.Id == user_id);
            if (existedUser is null)
            {
                _logger.LogInformation("create Work log User_id = {@id} failed: User not found", user_id);
                throw new NotFoundException("User not found by Id: " + user_id);
            }

            //check existed shift
            var existedShift = await _context.Shifts.FirstOrDefaultAsync(shift => shift.Id == shift_id);
            var currentShift = await GetCurrentShift(user_id);
            if (currentShift != null)
            {
                if (currentShift.Id != shift_id)
                {
                    throw new BadRequestException("Shift is not valid");
                }
            }
            else
            {
                throw new BadRequestException("Shift is not valid");
            }
            if (existedShift is null)
            {
                _logger.LogInformation("create Work log Shift_id = {@id} failed: Shift not found", shift_id);
                throw new NotFoundException("Shift not found by Id: " + shift_id);
            }

            //check existed work log
            var existedWorkLog = await _context.WorkLogs.FirstOrDefaultAsync(wl => wl.ShiftId == existedShift.Id);
            if (existedWorkLog is null)
            {
                _logger.LogInformation("Work Log not found");
                throw new NotFoundException("Work Log not found");
            }
            else if (existedWorkLog.TotalTime != 0)
            {
                _logger.LogInformation("You have checked out");
                throw new NotFoundException("You have checked out");
            }

            _logger.LogInformation("====== Start Create request table \n");
            var tran = _context.Database.BeginTransaction();

            try
            {
                TimeSpan offset = TimeSpan.Parse("7:00");
                DateTimeOffset now = DateTimeOffset.UtcNow.ToOffset(offset);
                if (now.DateTime < existedShift.EndTime)
                {
                    existedWorkLog.CheckOutTime = now.DateTime;
                }
                else
                {
                    existedWorkLog.CheckOutTime = existedShift.EndTime;
                }
                var start_time = (float)GetTimeHH(existedWorkLog.CheckInTime) + ((float)GetTimemm(existedWorkLog.CheckInTime) / (float)60);
                var end_time = (float)GetTimeHH(existedWorkLog.CheckOutTime) + ((float)GetTimemm(existedWorkLog.CheckOutTime) / (float)60);
                existedWorkLog.TotalTime = end_time - start_time;
                existedShift.Status = ShiftStatus.Worked;
                _context.Entry(existedShift).State = EntityState.Modified;
                _context.Entry(existedWorkLog).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                tran.Commit();

                return existedWorkLog;
            }
            catch (System.Exception ex)
            {
                tran.Rollback();
                _logger.LogInformation("Check in with shift_id = {@shift_id} failed .  Error = {Message} ", shift_id, ex.Message);
                throw new NotFoundException(ex.Message);
            }
        }
        public async Task<ShiftResponse> GetShift(int userId, int shiftId)
        {
            var existedUser = await _context.Users.FirstOrDefaultAsync(user => user.Id == userId);
            if (existedUser is null)
            {
                throw new NotFoundException("User not found by Id: " + userId);
            }
            var existedShift = new Shift();
            if (existedUser.RoleId == Convert.ToInt32(UserType.Admin))
            {
                existedShift = await _context.Shifts
                                    .Include(s => s.User)
                                    .Include(s => s.WorkLog)
                                    .FirstOrDefaultAsync(shift => shift.Id == shiftId);
            }
            else
                existedShift = await _context.Shifts
                                                .Include(s => s.User)
                                                .Include(s => s.WorkLog)
                                                .FirstOrDefaultAsync(shift => shift.Id == shiftId && shift.UserId == userId);
            //check existed shift
            if (existedShift is null)
            {
                throw new NotFoundException("Shift not found by Id: " + shiftId);
            }
            return _mapper.Map<Shift, ShiftResponse>(existedShift);
        }
        private async Task<Shift> GetCurrentShift(int userId)
        {
            TimeSpan offset = TimeSpan.Parse("7:00");
            DateTimeOffset now = DateTimeOffset.UtcNow.ToOffset(offset);
            var query = await _context.Shifts
                        .Include(s => s.User)
                         .FirstOrDefaultAsync(s => s.Status == ShiftStatus.New
                                                && s.UserId == userId
                                                && s.StartTime.AddMinutes(-30) <= now.DateTime
                                                && s.EndTime.AddMinutes(30) >= now.DateTime);
            return query;
        }
        public async Task<Pagination<ShiftResponse>> GetAllShift(int userId, GetShiftRequest request)
        {
            try
            {
                var existedUser = await _context.Users.FirstOrDefaultAsync(user => user.Id == userId);
                if (existedUser is null)
                {
                    _logger.LogInformation("create Work log User_id = {@id} failed: User not found", userId);
                    throw new NotFoundException("User not found by Id: " + userId);
                }

                Pagination<ShiftResponse> response = new Pagination<ShiftResponse>();
                var query = _context.Shifts
                                    .Include(s => s.WorkLog)
                                    .Include(s => s.User)
                                    .AsQueryable();

                query = query.Where(x => x.WorkDate >= request.StartDate && x.WorkDate <= request.EndDate);
                if (existedUser.RoleId == Convert.ToInt32(UserType.Admin) && request.UserId != null)
                    query = query.Where(x => x.UserId == request.UserId);
                else if (existedUser.RoleId != Convert.ToInt32(UserType.Admin))
                    query = query.Where(x => x.UserId == userId);
                if (request.Status != null)
                {
                    query = query.Where(x => x.Status == request.Status);
                }
                query = query.OrderByExt(request.SortBy.ToString(), request.Direction);
                query = query.AsNoTracking();
                var count = query.Count();
                query = query.Pagination(request.Offset, request.Limit);
                var shifts = await query.Select(c => _mapper.Map<Shift, ShiftResponse>(c)).ToListAsync();
                response.data = shifts;
                response.count = count;
                return response;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<ShiftResponse> CreateShift(CreateShiftRequest request)
        {
            var shift = new Shift();
            Assign.Partial(request, shift);

            var existedUser = await _context.Users.FirstOrDefaultAsync(user => user.Id == request.UserId);
            if (existedUser is null)
            {
                throw new NotFoundException("User not found by Id: " + request.UserId);
            }
            CanInsertShift(request.StartTime, request.EndTime, request.WorkDate, request.UserId);
            shift.Status = ShiftStatus.New;
            await _context.Shifts.AddAsync(shift);
            _context.Entry(shift).State = EntityState.Added;
            await _context.SaveChangesAsync();
            return _mapper.Map<Shift, ShiftResponse>(shift);
        }

        public async Task<ShiftResponse> UpdateShift(int shiftId, UpdateShiftRequest request)
        {
            TimeSpan offset = TimeSpan.Parse("7:00");
            DateTimeOffset now = DateTimeOffset.UtcNow.ToOffset(offset);
            var shift = _context.Shifts
                                    .Include(s => s.User)
                                    .FirstOrDefault(s => s.Id == shiftId);
            if (shift is null)
            {
                throw new NotFoundException("Shift not found by Id: " + shiftId);
            }
            var existedUser = await _context.Users.FirstOrDefaultAsync(user => user.Id == request.UserId);
            if (existedUser is null)
            {
                throw new NotFoundException("User not found by Id: " + request.UserId);
            }
            if (shift.Status == ShiftStatus.Worked)
            {
                throw new BadRequestException("The shift cannot be edited because it has a status of done");
            }
            if (shift.WorkDate.Date < now.DateTime.Date)
            {
                throw new BadRequestException("Can only update future shifts");
            }
            else if (shift.WorkDate.Date == now.DateTime.Date && shift.StartTime < now.DateTime)
            {
                throw new BadRequestException("Can only update future shifts");
            }
            CanInsertShift(request.StartTime, request.EndTime, request.WorkDate, request.UserId);
            Assign.Partial(request, shift);
            _context.Entry(shift).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return _mapper.Map<Shift, ShiftResponse>(shift);
        }

        private Boolean CanInsertShift(DateTime startTime, DateTime endTime, DateTime WorkDate, int userId)
        {
            var check_start_time = (float)GetTimeHH(startTime) + ((float)GetTimemm(startTime) / (float)60);
            var check_end_time = (float)GetTimeHH(endTime) + ((float)GetTimemm(endTime) / (float)60);

            if (check_end_time <= check_start_time)
                throw new Exception("End time less than Start Time");
            if (check_end_time - check_start_time < 0.5)
                throw new Exception("The minimum working time is 30 minutes.");

            var query = _context.Shifts.Where(s => s.WorkDate.Date == WorkDate.Date
                                                && s.WorkDate.Month == WorkDate.Month
                                                && s.WorkDate.Year == WorkDate.Year
                                                && s.UserId == userId).ToList();

            foreach (var x in query)
            {
                var start_time = (float)GetTimeHH(x.StartTime) + ((float)GetTimemm(x.StartTime) / (float)60);
                var end_time = (float)GetTimeHH(x.EndTime) + ((float)GetTimemm(x.EndTime) / (float)60);

                if ((check_start_time >= start_time && check_start_time <= end_time)
                || (check_end_time >= start_time && check_end_time <= end_time))
                {
                    throw new Exception("Shifts overlap. Note: Work shifts must not overlap in time, and there should be at least a 30-minute gap between consecutive shifts.");
                }
                if (check_start_time > end_time && check_start_time - end_time < 0.5)
                {
                    throw new Exception("Shifts overlap. Note: Work shifts must not overlap in time, and there should be at least a 30-minute gap between consecutive shifts.");
                }
                if (check_end_time < start_time && start_time - check_end_time < 0.5)
                {
                    throw new Exception("Shifts overlap. Note: Work shifts must not overlap in time, and there should be at least a 30-minute gap between consecutive shifts.");
                }
            }
            return true;
        }

        private int GetTimeHH(DateTime time)
        {
            return Convert.ToInt32(time.ToString("HH"));
        }

        private int GetTimemm(DateTime time)
        {
            return Convert.ToInt32(time.ToString("mm"));
        }

        public async Task<bool> DeleteShift(int[] shiftIds)
        {
            var trans = _context.Database.BeginTransaction();
            try
            {
                foreach (var id in shiftIds)
                {
                    var shift = _context.Shifts.FirstOrDefault(s => s.Id == id);
                    if (shift is null)
                    {
                        throw new NotFoundException("Shift not found by Id: " + id);
                    }

                    _context.Entry(shift).State = EntityState.Deleted;
                }
                await _context.SaveChangesAsync();
                trans.Commit();
            }
            catch (Exception ex)
            {
                trans.Rollback();
                throw;
            }
            return true;
        }

        public async Task<bool> DeleteChangeWorklogRequest(int[] ids, User user)
        {
            var trans = _context.Database.BeginTransaction();
            try
            {
                foreach (var id in ids)
                {
                    var rq = _context.requestToChangeWorklogs
                                                        .Include(rq => rq.Shift)
                                                        .FirstOrDefault(s => s.Id == id);
                    if (rq is null)
                    {
                        throw new NotFoundException("WorklogChangeRequest not found by Id: " + id);
                    }
                    if (user.RoleId == Convert.ToInt32(UserType.Staff) && rq.Shift.UserId != user.Id)
                    {
                        throw new BadRequestException("WorklogChangeRequest not found by Id: " + id);
                    }
                    _context.Entry(rq).State = EntityState.Deleted;
                }
                await _context.SaveChangesAsync();
                trans.Commit();
            }
            catch (Exception ex)
            {
                trans.Rollback();
                throw;
            }
            return true;
        }

        public Task<ShiftResponse> GetCurrent_Shift(int user_id)
        {
            throw new NotImplementedException();
        }

        public async Task<RequestToChangeWorklogResponse> CreateChangeWorklogRequest(CreateChangeWorklogRequest request, int user_id)
        {
            TimeSpan offset = TimeSpan.Parse("7:00");
            DateTimeOffset now = DateTimeOffset.UtcNow.ToOffset(offset);

            var shift = await _context.Shifts
                                        .Include(s => s.Requests)
                                        .FirstOrDefaultAsync(x => x.UserId == user_id && x.Id == request.ShiftId);
            if (shift is null)
            {
                throw new NotFoundException("Shift is not exist");
            }
            if (shift.Status == ShiftStatus.Cancel)
            {
                throw new BadRequestException("Status shift is Cancel");
            }
            if (shift.WorkDate.Date > now.DateTime.Date
                || (shift.WorkDate.Date == now.DateTime.Date && shift.EndTime > now.DateTime))
            {
                throw new BadRequestException("The shift could not create the request");
            }

            if (shift.Requests.Where(rq => rq.Status == RequestToChangeWorklogStatus.Inprogress || rq.Status == RequestToChangeWorklogStatus.Reject).Count() > 0)
            {
                throw new BadRequestException("shift have the WorklogChangeRequest");
            }
            if (request.StartTime > request.EndTime)
            {
                throw new BadRequestException("Start time greater than End Time");
            }

            if (request.StartTime.AddSeconds(-request.StartTime.Second) < shift.StartTime.AddSeconds(-shift.StartTime.Second)
                || request.StartTime.AddSeconds(-request.StartTime.Second) > shift.EndTime.AddSeconds(-shift.EndTime.Second)
                )
            {
                throw new BadRequestException("Start Time is not valid");
            }

            if (request.EndTime.AddSeconds(-request.EndTime.Second) < shift.StartTime.AddSeconds(-shift.StartTime.Second)
                || request.EndTime.AddSeconds(-request.EndTime.Second) > shift.EndTime.AddSeconds(-shift.EndTime.Second)
                )
            {
                throw new BadRequestException("End Time is not valid");
            }

            RequestToChangeWorklog rq = new RequestToChangeWorklog();

            Assign.Partial(request, rq);
            rq.Status = RequestToChangeWorklogStatus.Inprogress;

            _context.requestToChangeWorklogs.Add(rq);
            _context.Entry(rq).State = EntityState.Added;
            await _context.SaveChangesAsync();
            return _mapper.Map<RequestToChangeWorklog, RequestToChangeWorklogResponse>(rq);
        }

        public async Task<RequestToChangeWorklogResponse> UpdateChangeWorklogRequest(UpdateChangeWorklogRequest request, int user_id, int requestId)
        {
            var requestcwl = _context.requestToChangeWorklogs
                                                        .Include(rq => rq.Shift)
                                                        .ThenInclude(s => s.User)
                                                        .FirstOrDefault(s => s.Id == requestId);
            if (requestcwl is null)
            {
                throw new NotFoundException("WorklogChangeRequest not found by Id: " + requestId);
            }

            if (request.StartTime > request.EndTime)
            {
                throw new BadRequestException("Start time greater than End Time");
            }

            if (request.StartTime.AddSeconds(-request.StartTime.Second) < requestcwl.Shift.StartTime.AddSeconds(-requestcwl.Shift.StartTime.Second)
                || request.StartTime.AddSeconds(-request.StartTime.Second) > requestcwl.Shift.EndTime.AddSeconds(-requestcwl.Shift.EndTime.Second)
                )
            {
                throw new BadRequestException("Start Time is not valid");
            }

            if (request.EndTime.AddSeconds(-request.EndTime.Second) < requestcwl.Shift.StartTime.AddSeconds(-requestcwl.Shift.StartTime.Second)
                || request.EndTime.AddSeconds(-request.EndTime.Second) > requestcwl.Shift.EndTime.AddSeconds(-requestcwl.Shift.EndTime.Second)
                )
            {
                throw new BadRequestException("End Time is not valid");
            }

            Assign.Partial(request, requestcwl);
            requestcwl.Status = RequestToChangeWorklogStatus.Inprogress;
            _context.Entry(requestcwl).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return _mapper.Map<RequestToChangeWorklog, RequestToChangeWorklogResponse>(requestcwl);
        }

        public async Task<Pagination<RequestToChangeWorklogResponse>> GetAllChangeWorklogRequest(int user_id, GetAllChangeWorklogRequest request)
        {
            try
            {
                var existedUser = await _context.Users.FirstOrDefaultAsync(user => user.Id == user_id);

                Pagination<RequestToChangeWorklogResponse> response = new Pagination<RequestToChangeWorklogResponse>();
                var query = _context.requestToChangeWorklogs
                                                        .Include(rq => rq.Shift)
                                                        .ThenInclude(s => s.User)
                                                         .AsQueryable();

                query = query.Where(x => x.CreatedAt.Date >= request.StartDate && x.CreatedAt.Date <= request.EndDate);
                if (existedUser.RoleId == Convert.ToInt32(UserType.Admin) && request.UserId != null)
                    query = query.Where(x => x.Shift.UserId == request.UserId);
                else if (existedUser.RoleId != Convert.ToInt32(UserType.Admin))
                    query = query.Where(x => x.Shift.UserId == user_id);
                if (request.Status != null)
                {
                    query = query.Where(x => x.Status == request.Status);
                }
                query = query.AsNoTracking();
                var count = query.Count();
                query = query.Pagination(request.Offset, request.Limit);
                var shifts = query.Select(c => _mapper.Map<RequestToChangeWorklog, RequestToChangeWorklogResponse>(c)).ToList();
                response.data = shifts;
                response.count = count;
                return response;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<bool> ApproveWorklogChangeRequest(int requestId)
        {
            var requestcwl = _context.requestToChangeWorklogs
                                                        .Include(rq => rq.Shift)
                                                        .ThenInclude(s => s.User)
                                                        .Include(rq => rq.Shift.WorkLog)
                                                        .FirstOrDefault(s => s.Id == requestId);
            if (requestcwl is null)
            {
                throw new NotFoundException("WorklogChangeRequest not found by Id: " + requestId);
            }

            if (requestcwl.Status == RequestToChangeWorklogStatus.Done)
            {
                throw new BadRequestException("WorklogChangeRequest is done");
            }

            if (requestcwl.Status == RequestToChangeWorklogStatus.Reject)
            {
                throw new BadRequestException("WorklogChangeRequest is reject");
            }
            bool worklogNotFondflag = false;
            var worklog = requestcwl.Shift.WorkLog;
            if (worklog == null)
            {
                worklog = new WorkLog();
                worklog.ShiftId = requestcwl.ShiftId;
                worklog.UserId = requestcwl.Shift.UserId;
                worklog.MacAddress = "";
                worklog.TotalTime = 0;
                worklogNotFondflag = true;
            }
            worklog.CheckInTime = requestcwl.StartTime;
            worklog.CheckOutTime = requestcwl.EndTime;
            var start_time = (float)GetTimeHH(worklog.CheckInTime) + ((float)GetTimemm(worklog.CheckInTime) / (float)60);
            var end_time = (float)GetTimeHH(worklog.CheckOutTime) + ((float)GetTimemm(worklog.CheckOutTime) / (float)60);
            worklog.TotalTime = end_time - start_time;
            var shift = requestcwl.Shift;

            shift.Status = ShiftStatus.Worked;
            requestcwl.Status = RequestToChangeWorklogStatus.Done;

            if (worklogNotFondflag == true)
            {
                _context.WorkLogs.Add(worklog);
                _context.Entry(worklog).State = EntityState.Added;
            }
            else
            {
                _context.Entry(worklog).State = EntityState.Modified;
            }
            _context.Entry(requestcwl).State = EntityState.Modified;
            _context.Entry(shift).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RejectWorklogChangeRequest(int requestId)
        {
            var requestcwl = _context.requestToChangeWorklogs
                                                        .Include(rq => rq.Shift)
                                                        .ThenInclude(s => s.User)
                                                        .FirstOrDefault(s => s.Id == requestId);
            if (requestcwl is null)
            {
                throw new NotFoundException("WorklogChangeRequest not found by Id: " + requestId);
            }
            if (requestcwl.Status == RequestToChangeWorklogStatus.Done)
            {
                throw new BadRequestException("WorklogChangeRequest is done");
            }

            if (requestcwl.Status == RequestToChangeWorklogStatus.Reject)
            {
                throw new BadRequestException("WorklogChangeRequest is reject.Please Update the Request with correct data");
            }
            requestcwl.Status = RequestToChangeWorklogStatus.Reject;
            _context.Entry(requestcwl).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}