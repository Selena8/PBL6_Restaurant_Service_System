using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;

namespace pbl6_be.Services
{
    public interface ICategoryService
    {
        Task<Pagination<GetCategoryResponse>> GetAll(GetCategoryRequest request);
        Task<Category> GetOne(int id);
        Task<Category> Create(CreateCategoryRequest request);
        Task<Category> Update(int id, UpdateCategoryRequest request);
        Task<bool> Delete(int id);
        Task<bool> Delete(IEnumerable<int> ids);
        Task<bool> Exist(int id);
    }
}
