using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;

namespace pbl6_be.Services
{
    public interface ITableService
    {
        Task<Pagination<TableResponse>> GetAll(GetAllTableRequest request);
        Task<TableResponse> Get(int id);
        Task<TableResponse> Update(int id, UpdateTableRequest request);
        Task<TableResponse> Create(UpdateTableRequest request);
        Task<Boolean> Delete(int[] ids);
    }
}