using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using pbl6_be.Services;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using Object = pbl6_be.Domain.Models.Schemas.Object;

namespace pbl6_be.Api.Controllers
{
    [Route("api/build-map")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private IMapService _mapService;
        public MapController(IMapService mapService)
        {
            this._mapService = mapService;
        }

        [HttpGet("get-all-object")]
        public async Task<ActionResult<Pagination<Object>>> GetAll()
        {
            return await this._mapService.GetAllObject();
        }

        [HttpPost("add-object")]
        public async Task<ActionResult<Object>> Add([FromBody] UpdateObjectRequest request)
        {
            return await this._mapService.AddObject(request);
        }

        [HttpPut("update-object/{id}")]
        public async Task<ActionResult<Object>> Update([FromRoute] string id, [FromBody] UpdateObjectRequest request)
        {
            return await this._mapService.UpdateObject(id, request);
        }

        [HttpDelete("delete-object/{id}")]
        public async Task<ActionResult<Boolean>> Delete([FromRoute] string id)
        {
            return await this._mapService.DeleteObject(id);
        }

        [HttpGet("get-object/{id}")]
        public async Task<ActionResult<Object>> Get([FromRoute] string id)
        {
            return await this._mapService.GetObject(id);
        }
    }
}