using Microsoft.AspNetCore.Mvc;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Services;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Api.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(
            ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("{id}")]
        
        public async Task<ActionResult<Category>> GetJobCategory(int id)
        {
            return await _categoryService.GetOne(id);
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<GetCategoryResponse>>> Get([FromQuery] GetCategoryRequest request)
        {
            var result = await _categoryService.GetAll(request);
            return result;
        }

        [HttpPut("{id}")]
        [Authorize]
        [UserTypeFilter(UserType.Admin)]
        public async Task<ActionResult<Category>> Update(int id, UpdateCategoryRequest request)
        {
            return await _categoryService.Update(id, request);
        }

        [HttpDelete("{id}")]
        [Authorize]
        [UserTypeFilter(UserType.Admin)]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return await _categoryService.Delete(id);
        }

        [HttpDelete]
        [Authorize]
        [UserTypeFilter(UserType.Admin)]
        public async Task<ActionResult<bool>> Delete(IEnumerable<int> ids)
        {
            return await _categoryService.Delete(ids);
        }

        [HttpPost]
        [Authorize]
        [UserTypeFilter(UserType.Admin)]
        public async Task<ActionResult<Category>> Create(CreateCategoryRequest request)
        {
            return await _categoryService.Create(request);
        } 
    }
}