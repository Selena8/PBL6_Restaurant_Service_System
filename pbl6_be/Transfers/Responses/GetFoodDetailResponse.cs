using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pbl6_be.Transfers.Responses
{
    public class GetFoodDetailResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }
        public string Image { get; set; }
        public List<GetFoodMakingProcessResponse> FoodMakingProcessResponse { get; set; }
        public List<GetIngredientsOfFoodResponse> IngredientsOfFoodResponse { get; set; }
    }
}