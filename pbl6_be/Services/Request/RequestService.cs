using Api.Common;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using pbl6_be.Common.Utilities;
using pbl6_be.Common.Utilities.Exceptions;
using pbl6_be.Domain;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Transfers;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using Trouble_Resolving_SystemBackEnd.Extensions;

namespace pbl6_be.Services
{
    public class RequestService : IRequestService
    {
        private readonly IMapper _mapper;
        private ILogger<FoodService> _logger;
        private readonly Context _context;

        public RequestService(Context context,
            IMapper mapper,
            ILogger<FoodService> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<Pagination<GetRequestTableResponse>> GetAll(Table table, GetRequestTable request)
        {
            try
            {
                _logger.LogInformation("====== Start get all request by tableId ======" +
                  "\nRequest: {@request}", request);
                Pagination<GetRequestTableResponse> response = new Pagination<GetRequestTableResponse>();
                var query = _context.Requests
                                        .Include(r => r.Table)
                                        .OrderByExt(request.SortBy, request.Direction);
                var test = query.ToList();

                if (!string.IsNullOrEmpty(request.RequestStatus.GetDisplayName()))
                {
                    query = query.Where(c => c.Status == request.RequestStatus);
                }
                if (request.TableId != 0 && table == null)
                {
                    query = query.Where(c => c.TableId == request.TableId);
                }
                if (table != null)
                {
                    query = query.Where(c => c.TableId == table.Id);
                }
                query = query.AsNoTracking();
                var count = query.Count();
                query = query.Pagination(request.Offset, request.Limit);
                var requestTable = await query.Select(c => _mapper.Map<Request, GetRequestTableResponse>(c)).ToListAsync();
                response.data = requestTable;
                response.count = count;
                _logger.LogInformation("Get all request successfully");
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Get All request table with request = {@request} failed. Error = {Message}", request, ex.Message);
                throw;
            }
        }

        public async Task<Request> Create(Table table, CreateRequestTableRequest request)
        {
            //check exist table
            var existTable = await _context.Tables.FirstOrDefaultAsync(tb => tb.Id == table.Id);
            if (existTable is null)
            {
                _logger.LogInformation("create request table td = {@id} failed: Table not found", table.Id);
                throw new NotFoundException("Table not found by Id: " + table.Id);
            }

            //Lấy thời gian hiện tại
            TimeSpan offset = TimeSpan.Parse("07:00");
            DateTimeOffset now = DateTimeOffset.UtcNow.ToOffset(offset);
            var timeNow = now.DateTime;

            //Xem tất cả các request trong thời gian 1 tiếng trở lại trước
            var listRequestTable = await _context.Requests
                .Where(rq => rq.TableId == table.Id && rq.RequestTime.Date == timeNow.Date && rq.RequestTime > timeNow.AddHours(-1))
                .ToArrayAsync();

            // Nếu bé hơn Limit thì mới add request
            if (listRequestTable.Length < Constants.RequestLimit)
            {
                _logger.LogInformation("====== Start Create request table \n with  request = {@request} ======", request);
                var tran = _context.Database.BeginTransaction();
                try
                {
                    var newRequestTable = _mapper.Map<CreateRequestTableRequest, Request>(request);
                    newRequestTable.Rank = 1;
                    Console.WriteLine((RequestPriority)(listRequestTable.Length + 1));

                    newRequestTable.Status = RequestStatus.in_progress;
                    newRequestTable.TableId = table.Id;
                    newRequestTable.Table = table;
                    newRequestTable.UserId = 1;
                    newRequestTable.RequestTime = timeNow;

                    _context.Requests.Add(newRequestTable);
                    _context.Entry(newRequestTable).State = EntityState.Added;
                    await _context.SaveChangesAsync();
                    tran.Commit();
                    newRequestTable.Table = null;
                    return newRequestTable;
                }
                catch (System.Exception ex)
                {
                    tran.Rollback();
                    _logger.LogInformation("Create request with request = {@request} failed .  Error = {Message} ", request, ex.Message);
                    throw new NotFoundException(ex.Message);
                }
            }
            else
            {
                _logger.LogInformation("Maximum request limit in an hour");
                throw new NotFoundException("Maximum request limit");
            }
        }

        public async Task<Request> Update(Table table, int id, UpdateRequestTableRequest request)
        {
            //check exist table
            var existTable = await _context.Tables
                                            .FirstOrDefaultAsync(tb => tb.Id == table.Id);
            if (existTable is null)
            {
                _logger.LogInformation("create request table td = {@id} failed: Table not found", table.Id);
                throw new NotFoundException("Table not found by Id: " + table.Id);
            }

            var requestTable = await _context.Requests
                                                .Include(r => r.Table)
                                                .Where(tb => tb.TableId == table.Id && tb.Id == id).FirstOrDefaultAsync();
            if (requestTable is null)
            {
                _logger.LogInformation("Update request table td = {@id} failed: Table not found", table.Id);
                throw new NotFoundException("Table not found by Id: " + table.Id);
            }
            else if (requestTable.Status == RequestStatus.done)
            {
                _logger.LogInformation("Request Table is done, cannot update");
                throw new NotFoundException("Request Table is done, cannot update");
            }

            _logger.LogInformation("====== Start Create request table \n with  request = {@request} ======", request);
            var tran = _context.Database.BeginTransaction();

            try
            {
                requestTable.Type = request.Type;
                requestTable.Description = request.Description;

                _context.Entry(requestTable).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                tran.Commit();
                requestTable.Table = null;
                return requestTable;
            }
            catch (System.Exception ex)
            {
                tran.Rollback();
                _logger.LogInformation("Create request with request = {@request} failed .  Error = {Message} ", request, ex.Message);
                throw new NotFoundException(ex.Message);
            }
        }

        public async Task<Boolean> Delete(Table table, int id)
        {
            var existTable = await _context.Tables.FirstOrDefaultAsync(tb => tb.Id == table.Id);
            if (existTable is null)
            {
                _logger.LogInformation("create request table td = {@id} failed: Table not found", table.Id);
                throw new NotFoundException("Table not found by Id: " + table.Id);
            }

            var requestTable = await _context.Requests
                                                    .Include(r => r.Table)
                                                    .Where(tb => tb.TableId == table.Id && tb.Id == id).FirstOrDefaultAsync();
            if (requestTable is null)
            {
                _logger.LogInformation("Update request table td = {@id} failed: Table not found", table.Id);
                throw new NotFoundException("Table not found by Id: " + table.Id);
            }
            _context.Entry(requestTable).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ResolveRequest(int id, int HandleduserId)
        {
            var requestTable = await _context.Requests
                                                        .Include(r => r.Table)
                                                        .Where(tb => tb.Id == id).FirstOrDefaultAsync();
            if (requestTable is null)
            {
                throw new NotFoundException("Request not found by Id: " + id);
            }
            else if (requestTable.Status == RequestStatus.done)
            {
                _logger.LogInformation("Request Table is done, cannot update");
                throw new NotFoundException("Request Table is done, cannot update");
            }

            requestTable.Status = RequestStatus.done;
            requestTable.UserId = HandleduserId;
            _context.Entry(requestTable).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
