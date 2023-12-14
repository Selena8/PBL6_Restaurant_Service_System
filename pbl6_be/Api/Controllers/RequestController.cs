using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pbl6_be.Domain;
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Services;
using pbl6_be.Transfers;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;

namespace pbl6_be.Api
{
    [Route("api/request-support")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService _requestService;
        private readonly Context _context;

        public RequestController(IRequestService requestService, Context context)
        {
            _context = context;
            _requestService = requestService;
        }

        [HttpGet]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff, Common.Enum.UserType.Table)]
        public async Task<ActionResult<Pagination<GetRequestTableResponse>>> Get([FromQuery] GetRequestTable request)
        {
            var tableid = HttpContext.Items["TableId"] as int?;
            var table = _context.Tables.FirstOrDefault(t => t.Id == tableid);
            var result = await _requestService.GetAll(table, request);
            return result;
        }

        [HttpPost]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Table)]
        public async Task<ActionResult<Request>> Create(CreateRequestTableRequest request)
        {
            var tableid = HttpContext.Items["TableId"] as int?;
            var table = _context.Tables.FirstOrDefault(t => t.Id == tableid);
            return await _requestService.Create(table, request);
        }

        [HttpPut("{id}")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Table)]
        public async Task<ActionResult<Request>> Put(int id, UpdateRequestTableRequest request)
        {
            var tableid = HttpContext.Items["TableId"] as int?;
            var table = _context.Tables.FirstOrDefault(t => t.Id == tableid);
            return await _requestService.Update(table, id, request);
        }

        [HttpDelete("{id}")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff, Common.Enum.UserType.Table)]
        public async Task<ActionResult<Boolean>> Delete(int id)
        {
            var tableid = HttpContext.Items["TableId"] as int?;
            var table = _context.Tables.FirstOrDefault(t => t.Id == tableid);
            return await _requestService.Delete(table, id);
        }

        [HttpPatch("resolve-request/{id}")]
        [Authorize]
        [UserTypeFilter(Common.Enum.UserType.Staff)]
        public async Task<ActionResult<Boolean>> ResolveRequest(int id)
        {
            var user = HttpContext.Items["User"] as User;
            return await _requestService.ResolveRequest(id, user.Id);
        }
    }
}
