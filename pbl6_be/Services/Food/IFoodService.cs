using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Transfers.DTOs;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;

namespace pbl6_be.Services
{
    public interface IFoodService
    {
        Task<Pagination<GetFoodResponse>> GetAll(GetFoodRequest request);
        Task<GetFoodDetailResponse> GetOne(int id);
        Task<Food> Create(CreateFoodRequest request);
        Task<Food> Update(int id, CreateFoodRequest request);
        Task<bool> Delete(int id);
        Task<bool> Delete(IEnumerable<int> ids);
        Task<bool> UploadImage(int id,UploadFileDto dt);
    }
}