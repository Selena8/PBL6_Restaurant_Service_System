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
    [Route("api/staffs")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private IStaffService _staffService;
        public StaffController(IStaffService staffService)
        {
            this._staffService = staffService;
        }
        [HttpGet]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin)]
        public async Task<ActionResult<Pagination<GetStaffResponse>>> GetAll([FromQuery] GetStaffRequest request)
        {
            return await this._staffService.GetAll(request);
        }

        [HttpGet("{id}")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin)]
        public async Task<ActionResult<GetStaffResponse>> GetById(int id)
        {
            return await this._staffService.GetStaff(id);
        }

        [HttpDelete]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin)]
        public async Task<ActionResult<Boolean>> Delete(int[] ids)
        {
            return await this._staffService.Delete(ids);
        }

        [HttpPut("{id}")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin)]
        public async Task<ActionResult<GetStaffResponse>> Update(int id, UpdateStaffRequest request)
        {
            return await this._staffService.Update(id, request);
        }

        [HttpPost]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin)]
        public async Task<ActionResult<GetStaffResponse>> Create(CreateStaffRequest request)
        {
            return await this._staffService.CreateStaff(request);
        }
    }
}