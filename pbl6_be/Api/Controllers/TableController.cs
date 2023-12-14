using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using pbl6_be.Services;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;

namespace pbl6_be.Api.Controllers
{
    [Route("api/tables")]
    [ApiController]
    public class TableController: ControllerBase
    {
        private ITableService _tableService;
        public TableController(ITableService tableService)
        {
            this._tableService = tableService;
        }

        [HttpGet]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin,Common.Enum.UserType.Staff)]
        public async Task<ActionResult<Pagination<TableResponse>>> GetAll([FromQuery] GetAllTableRequest request)
        {
            return await this._tableService.GetAll(request);
        }

        [HttpGet("{id}")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin,Common.Enum.UserType.Staff)]
        public async Task<ActionResult<TableResponse>> GetById(int id)
        {
            return await this._tableService.Get(id);
        }

        [HttpDelete]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin)]
        public async Task<ActionResult<Boolean>> Delete(int[] ids)
        {
            return await this._tableService.Delete(ids);
        }

        [HttpPut("{id}")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin)]
        public async Task<ActionResult<TableResponse>> Update([FromRoute]int id,[FromBody] UpdateTableRequest request)
        {
            return await this._tableService.Update(id, request);
        }

        [HttpPost]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin)]
        public async Task<ActionResult<TableResponse>> Create(UpdateTableRequest request)
        {
            return await this._tableService.Create(request);
        }
    }
}