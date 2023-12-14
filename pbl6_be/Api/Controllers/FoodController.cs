using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Services;
using pbl6_be.Transfers.DTOs;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using static pbl6_be.Common.Enum;

namespace Namespace
{
    [Route("api/foods")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly IFoodService _foodService;

        public FoodController(IFoodService foodService)
        {
            _foodService = foodService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetFoodDetailResponse>> GetJobCategory(int id)
        {
            return await _foodService.GetOne(id);
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<GetFoodResponse>>> Get([FromQuery] GetFoodRequest request)
        {
            var result = await _foodService.GetAll(request);
            return result;
        }

        [HttpPost]
        [Authorize]
        [UserTypeFilter(UserType.Admin)]
        public async Task<ActionResult<Food>> Create(CreateFoodRequest request)
        {
            // request.File = image;
            return await _foodService.Create(request);
        }

        [HttpPut("{id}")]
        [Authorize]
        [UserTypeFilter(UserType.Admin)]
        public async Task<ActionResult<Food>> Put(int id, CreateFoodRequest request)
        {
            return await _foodService.Update(id, request);
        }

        [HttpDelete]
        [Authorize]
        [UserTypeFilter(UserType.Admin)]
        public async Task<ActionResult<Boolean>> Delete(List<int> ids)
        {
            return await _foodService.Delete(ids);
        }

        [HttpPut("{id}/upload-image")]
        [Authorize]
        [UserTypeFilter(UserType.Admin)]
        public async Task<ActionResult<Boolean>> UploadImage(int id, IFormFile image)
        {
            return await _foodService.UploadImage(id, new UploadFileDto() { File = image });
        }
    }
}