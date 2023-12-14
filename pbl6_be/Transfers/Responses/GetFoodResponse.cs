using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Responses
{
    public class GetFoodResponse
    {
        public string Id { get; set; } = null!;
        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public decimal Price { get; set; }

        public int CreatedUserId { get; set; }

        public int CategoryId { get; set; }

        public string Image { get; set; }
    }
}