using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pbl6_be.Domain.Models.Schemas;

namespace pbl6_be.Transfers.Requests
{
    public class GetShiftRequest
    {
        public DateTime StartDate { get; set; } = DateTime.MinValue;
        public DateTime EndDate { get; set; } = DateTime.MaxValue;
        public int? UserId {get; set;}
        public ShiftStatus? Status {get; set;}
        public int Limit { get; set; } = 15;
        public int Offset { get; set; } = 0;
        public GetShiftSortBy SortBy { get; set; } = GetShiftSortBy.Id;
        public string Direction { get; set; } = "DESC";
    }

    public enum GetShiftSortBy
    {
        Id,
        WorkDate,
    }
}