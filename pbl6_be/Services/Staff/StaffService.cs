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
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using Trouble_Resolving_SystemBackEnd.Extensions;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Services
{
    public class StaffService : IStaffService
    {
        private Context _context;
        private ILogger<FoodService> _logger;
        private readonly IMapper _mapper;
        private IUserService _userService;
        public StaffService(Context context,
                            ILogger<FoodService> logger,
                            IMapper mapper,
                            IUserService userService)
        {
            this._context = context;
            this._logger = logger;
            this._mapper = mapper;
            this._userService = userService;
        }

        public async Task<bool> Delete(int[] ids)
        {
            var tran = _context.Database.BeginTransaction();
            try
            {
                dynamic user;
                foreach (var id in ids)
                {
                    user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
                    if (user == null)
                    {
                        throw new NotFoundException("one in a list of user_id is not exist" + id);
                    }
                    _context.Entry(user).State = EntityState.Deleted;
                }
                await _context.SaveChangesAsync();
                tran.Commit();
                return true;
            }
            catch (System.Exception)
            {
                tran.Rollback();
                throw;
            }
        }

        public async Task<Pagination<GetStaffResponse>> GetAll(GetStaffRequest request)
        {
            try
            {
                _logger.LogInformation("====== Start get all staff ======" +
                  "\nRequest: {@request}", request);
                Pagination<GetStaffResponse> response = new Pagination<GetStaffResponse>();
                var query = _context.Users.AsQueryable();
                if (!string.IsNullOrWhiteSpace(request.Search) && request.SearchBy != SearchBy.None)
                {
                    if (request.SearchBy == SearchBy.Id)
                    {
                        query = query.Where(u => u.Id.ToString() == request.Search);
                    }
                    else if (request.SearchBy == SearchBy.FirstName)
                    {
                        query = query.Where(u => u.FirstName.Contains(request.Search));
                    }
                    else if (request.SearchBy == SearchBy.LastName)
                    {
                        query = query.Where(u => u.LastName.Contains(request.Search));
                    }
                    else if (request.SearchBy == SearchBy.Email)
                    {
                        query = query.Where(u => u.Email == request.Search);
                    }
                    else if (request.SearchBy == SearchBy.PhoneNumber)
                    {
                        query = query.Where(u => u.PhoneNumber == request.Search);
                    }
                }
                if (request.AccountStatus != null)
                {
                    query = query.Where(u => u.AccountStatus == request.AccountStatus);
                }
                if (request.UserType != null)
                {
                    query = query.Where(u => u.RoleId == Convert.ToInt16(request.UserType));
                }
                query = query.OrderByExt(request.SortBy.ToString(), request.Direction);
                query = query.AsNoTracking();
                var count = query.Count();
                query = query.Pagination(request.Offset, request.Limit);
                var staffs = await query.Select(c => _mapper.Map<User, GetStaffResponse>(c)).ToListAsync();
                response.data = staffs;
                response.count = count;
                _logger.LogInformation("Get all staff successfully");
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Get All Food with request = {@request} failed. Error = {Message}", request, ex.Message);
                throw;
            }
        }

        public async Task<GetStaffResponse> GetStaff(int id)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
                if (user == null)
                {
                    throw new NotFoundException("staff not found by Id: " + id);
                }
                return _mapper.Map<User, GetStaffResponse>(user);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<GetStaffResponse> Update(int id, UpdateStaffRequest request)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
                if (user == null)
                {
                    throw new NotFoundException("staff not found by Id: " + id);
                }
                Assign.Omit(request, user,new string[]{"UserType"});
                user.RoleId = Convert.ToInt32(request.UserType);
                _context.Entry(user).State = EntityState.Modified;
                _context.SaveChanges();
                return _mapper.Map<User, GetStaffResponse>(user);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<GetStaffResponse> CreateStaff(CreateStaffRequest request)
        {
            var tran = _context.Database.BeginTransaction();
            try
            {
                await _userService.SendVerifyEmail(new CreateAccountRequest(){Email = request.Email,Password="123456",UserType= (UserType)Convert.ToInt32(request.UserType)});
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
                Assign.Omit(request, user,new string[]{"Email","UserType"});
                _context.Entry(user).State = EntityState.Modified;
                _context.SaveChanges();
                await tran.CommitAsync();
                return _mapper.Map<User, GetStaffResponse>(user);
            }
            catch (Exception ex)
            {
                await tran.RollbackAsync();
                throw;
            }
        }
    }
}