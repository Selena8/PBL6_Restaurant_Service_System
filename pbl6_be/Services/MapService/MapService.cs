using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using pbl6_be.Common.Utilities.Exceptions;
using pbl6_be.Domain;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Extensions;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using Trouble_Resolving_SystemBackEnd.Extensions;
using Object = pbl6_be.Domain.Models.Schemas.Object;

namespace pbl6_be.Services
{
    public class MapService : IMapService
    {
        public readonly Context _context;
        public MapService(Context context)
        {
            this._context = context;
        }
        public async Task<Object> AddObject(UpdateObjectRequest request)
        {
            var Object = new Object();
            Assign.Partial(request, Object);

            Random random = new Random();
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
            Object.Id = new string(Enumerable.Repeat(chars, 20)
        .Select(s => s[random.Next(s.Length)]).ToArray());
            await this._context.Objects.AddAsync(Object);
            await this._context.SaveChangesAsync();
            return Object;
        }

        public async Task<bool> DeleteObject(string id)
        {
            var Object = this._context.Objects.FirstOrDefault(o => o.Id == id);

            this._context.Objects.Remove(Object);

            await this._context.SaveChangesAsync();

            return true;
        }

        public async Task<Pagination<Object>> GetAllObject()
        {
            Pagination<Object> response = new Pagination<Object>();
            var query = _context.Objects
                                .AsNoTracking()
                                .AsQueryable();
            var count = query.Count();
            var Objects = await query.ToListAsync();
            response.data = Objects;
            response.count = count;
            return response;
        }

        public async Task<Object> GetObject(string id)
        {
            Pagination<Object> response = new Pagination<Object>();
            var query = await _context.Objects
                                .FirstOrDefaultAsync(o => o.Id == id);

            if(query is null)
            {
                throw new NotFoundException("Object is not exist");
            }
            return query;
        }

        public async Task<Object> UpdateObject(string id, UpdateObjectRequest request)
        {
            var Object = this._context.Objects.FirstOrDefault(o => o.Id == id);

            Assign.Partial(request, Object);

            await this._context.SaveChangesAsync();

            return Object;
        }

        private async Task SeedData()
        {
            var trans = this._context.Database.BeginTransaction();
            try
            {
                for (var x = 0; x <= 100; x++)
                {
                    for (var y = 0; y <= 100; y++)
                    {
                        Point p = new Point();
                        p.CoordinateAxis = x;
                        p.HorizontalAxis = y;
                        p.IsOccupy = false;
                        p.IsFixed = false;

                        this._context.Points.Add(p);
                        _context.Entry(p).State = EntityState.Added;
                        _context.SaveChanges();
                    }
                }
                await trans.CommitAsync();
            }
            catch (System.Exception)
            {
                await trans.RollbackAsync();
                throw;
            }
        }
    }
}