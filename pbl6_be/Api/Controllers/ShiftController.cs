using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Services;
using pbl6_be.Transfers;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;

namespace pbl6_be.Api
{
    [Route("api/shifts")]
    [ApiController]
    public class ShiftController : ControllerBase
    {
        private readonly IShiftService _shiftService;
        public ShiftController(IShiftService shiftService)
        {
            _shiftService = shiftService;

        }

        [HttpPost("{shift_id}/check-in")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff)]
        public async Task<ActionResult<WorkLog>> CheckIn(int shift_id)
        {
            var staff = HttpContext.Items["User"] as User;
            return await _shiftService.CheckIn(staff.Id, shift_id);

        }

        [HttpPut("{shift_id}/check-out")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff)]
        public async Task<ActionResult<WorkLog>> CheckOut(int shift_id)
        {
            var staff = HttpContext.Items["User"] as User;
            return await _shiftService.CheckOut(staff.Id, shift_id);

        }

        [HttpGet]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff, Common.Enum.UserType.Admin)]
        public async Task<ActionResult<Pagination<ShiftResponse>>> GetAllShift([FromQuery] GetShiftRequest request)
        {
            var user = HttpContext.Items["User"] as User;
            return await _shiftService.GetAllShift(user.Id, request);

        }

        [HttpGet("{shift_id}")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff, Common.Enum.UserType.Admin)]
        public async Task<ActionResult<ShiftResponse>> GetShift(int shift_id)
        {
            var user = HttpContext.Items["User"] as User;
            return await _shiftService.GetShift(user.Id, shift_id);

        }

        [HttpGet("get-curennt-shift")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff, Common.Enum.UserType.Admin)]
        public async Task<ActionResult<ShiftResponse>> GetCurrent_Shift(int shift_id)
        {
            var user = HttpContext.Items["User"] as User;
            return await _shiftService.GetCurrent_Shift(user.Id);

        }

        [HttpPost]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin)]
        public async Task<ActionResult<ShiftResponse>> CreateShift([FromBody] CreateShiftRequest request)
        {
            return await _shiftService.CreateShift(request);
        }

        [HttpPut("{shift_id}")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin)]
        public async Task<ActionResult<ShiftResponse>> CreateShift([FromRoute] int shift_id, [FromBody] UpdateShiftRequest request)
        {
            return await _shiftService.UpdateShift(shift_id, request);
        }

        [HttpDelete]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin)]
        public async Task<ActionResult<Boolean>> DeleteShift(int[] shift_ids)
        {
            return await _shiftService.DeleteShift(shift_ids);
        }


        [HttpPost("request-change-worklog")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff)]
        public async Task<ActionResult<RequestToChangeWorklogResponse>> CreateChangeWorklogRequest([FromBody] CreateChangeWorklogRequest request)
        {
            var user = HttpContext.Items["User"] as User;
            return await _shiftService.CreateChangeWorklogRequest(request, user.Id);
        }

        [HttpPut("request-change-worklog/{requestId}")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff)]
        public async Task<ActionResult<RequestToChangeWorklogResponse>> UpdateChangeWorklogRequest([FromRoute] int requestId, [FromBody] UpdateChangeWorklogRequest request)
        {
            var user = HttpContext.Items["User"] as User;
            return await _shiftService.UpdateChangeWorklogRequest(request, user.Id, requestId);
        }

        [HttpDelete("request-change-worklog")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff, Common.Enum.UserType.Admin)]
        public async Task<ActionResult<Boolean>> DeleteChangeWorklogRequest(int[] ids)
        {
            var user = HttpContext.Items["User"] as User;
            return await _shiftService.DeleteChangeWorklogRequest(ids, user);
        }

        [HttpGet("request-change-worklog")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff, Common.Enum.UserType.Admin)]
        public async Task<ActionResult<Pagination<RequestToChangeWorklogResponse>>> GetAllChangeWorklogRequest([FromQuery] GetAllChangeWorklogRequest request)
        {
            var user = HttpContext.Items["User"] as User;
            return await _shiftService.GetAllChangeWorklogRequest(user.Id, request);
        }

        [HttpPut("approve-worklog-change-request/{requestId}")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin)]
        public async Task<ActionResult<Boolean>> ApproveWorklogChangeRequest([FromRoute] int requestId)
        {
            return await _shiftService.ApproveWorklogChangeRequest(requestId);
        }

        [HttpPut("reject-change-worklog/{requestId}")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Admin)]
        public async Task<ActionResult<Boolean>> RejectWorklogChangeRequest([FromRoute] int requestId)
        {
            return await _shiftService.RejectWorklogChangeRequest(requestId);
        }
    }
}