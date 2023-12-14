using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Transfers;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Services
{
    public interface IShiftService
    {
        Task<WorkLog> CheckIn(int user_id, int shift_id);
        Task<WorkLog> CheckOut(int user_id, int shift_id);
        Task<ShiftResponse> GetCurrent_Shift(int user_id);
        Task<Pagination<ShiftResponse>> GetAllShift(int userId, GetShiftRequest request);
        Task<ShiftResponse> GetShift(int userId, int shiftId);
        Task<ShiftResponse> CreateShift(CreateShiftRequest request);
        Task<ShiftResponse> UpdateShift(int shiftId,UpdateShiftRequest request);
        Task<Boolean> DeleteShift(int[] shiftId);
        Task<RequestToChangeWorklogResponse> CreateChangeWorklogRequest(CreateChangeWorklogRequest request,int user_id);
        Task<RequestToChangeWorklogResponse> UpdateChangeWorklogRequest(UpdateChangeWorklogRequest request,int user_id,int requestId);
        Task<Boolean> DeleteChangeWorklogRequest(int[] ids,User user);
        Task<Pagination<RequestToChangeWorklogResponse>> GetAllChangeWorklogRequest(int user_id,GetAllChangeWorklogRequest request);
        Task<Boolean> ApproveWorklogChangeRequest(int requestId);
        Task<Boolean> RejectWorklogChangeRequest(int requestId);
    }
}