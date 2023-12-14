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

namespace pbl6_be.Services
{
    public class TableService : ITableService
    {
        private Context _context;
        private IMapper _mapper;
        public TableService(Context context,
                            IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        public async Task<TableResponse> Create(UpdateTableRequest request)
        {
            if (_context.Tables.Any(t => t.TableName == request.TableName))
            {
                throw new BadRequestException("Table name is exist");
            }
            Table table = new Table();
            Assign.Partial(request, table);
            table.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);
            await _context.Tables.AddAsync(table);
            _context.Entry(table).State = EntityState.Added;
            await _context.SaveChangesAsync();
            return _mapper.Map<Table, TableResponse>(table);
        }

        public async Task<bool> Delete(int[] ids)
        {
            var trans = _context.Database.BeginTransaction();
            try
            {
                foreach (var id in ids)
                {
                    var query = _context.Tables
                               .FirstOrDefault(t => t.Id == id);

                    if (query == null)
                    {
                        throw new NotFoundException("Table not found");
                    }

                    _context.Entry(query).State = EntityState.Deleted;
                    await _context.SaveChangesAsync();
                }
                trans.Commit();
                return true;
            }
            catch (Exception e)
            {
                trans.Rollback();
                throw;
            }
        }

        public async Task<TableResponse> Get(int id)
        {
            var query = await _context.Tables
                                .Include(t => t.Orders)
                                .Include(t => t.Bookings)
                                .FirstOrDefaultAsync(t => t.Id == id);

            if (query == null)
            {
                throw new NotFoundException("Table not found");
            }
            return _mapper.Map<Table, TableResponse>(query);
        }

        public async Task<Pagination<TableResponse>> GetAll(GetAllTableRequest request)
        {
            Pagination<TableResponse> response = new Pagination<TableResponse>();
            var query = _context.Tables
                                .Include(t => t.Orders)
                                .AsQueryable();
            query = query.AsNoTracking();
            var tables = await query.Select(c => _mapper.Map<Table, TableResponse>(c)).ToListAsync();
            if (request.CurrentStatus != null)
            {
                tables = tables.Where(t => t.CurrentStatus == request.CurrentStatus).ToList();
            }
            tables = tables.Skip(request.Offset).Take(request.Limit).ToList();
            var count = tables.Count();
            response.data = tables;
            response.count = count;

            return response;
        }

        public async Task<TableResponse> Update(int id, UpdateTableRequest request)
        {
            var query = _context.Tables
                                .Include(t => t.Orders)
                                .Include(t => t.Bookings)
                               .FirstOrDefault(t => t.Id == id);
            Assign.Omit(request, query, new string[] { "TableName","Password" });
            if (!string.IsNullOrEmpty(request.Password))
            {
                query.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);
            }
            _context.Entry(query).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return _mapper.Map<Table, TableResponse>(query);
        }
    }
}