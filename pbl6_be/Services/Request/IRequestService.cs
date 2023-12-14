using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Transfers;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;

namespace pbl6_be.Services
{
    public interface IRequestService
    {
        Task<Pagination<GetRequestTableResponse>> GetAll(Table table, GetRequestTable request);
        Task<Request> Create(Table table, CreateRequestTableRequest request);
        Task<Request> Update(Table table, int id, UpdateRequestTableRequest request);
        Task<Boolean> Delete(Table table, int id);
        Task<Boolean> ResolveRequest(int id,int HandleduserId);
    }
}