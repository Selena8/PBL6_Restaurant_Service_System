using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using Object = pbl6_be.Domain.Models.Schemas.Object;

namespace pbl6_be.Services
{
    public interface IMapService
    {
        Task<Pagination<Object>> GetAllObject();
        Task<Boolean> DeleteObject(string id);
        Task<Object> AddObject(UpdateObjectRequest request);
        Task<Object> UpdateObject(string id,UpdateObjectRequest request);
        Task<Object> GetObject(string id);
    }
}