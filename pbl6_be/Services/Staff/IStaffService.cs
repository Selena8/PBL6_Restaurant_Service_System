using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;

namespace pbl6_be.Services
{
    public interface IStaffService
    {
        Task<Pagination<GetStaffResponse>> GetAll(GetStaffRequest request);
        Task<GetStaffResponse> GetStaff(int id);
        Task<Boolean> Delete(int[] ids);
        Task<GetStaffResponse> Update(int id,UpdateStaffRequest request);
        Task<GetStaffResponse> CreateStaff(CreateStaffRequest request);
    }
}