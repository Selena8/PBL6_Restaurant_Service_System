using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace pbl6_be.Transfers.Requests
{
    public class CreateFoodRequest
    {
        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string Description { get; set; } = null!;

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int CategoryId { get; set; }
        public List<CreateFoodMakingProcessRequest> FoodMakingProcessRequest { get; set; }
        public List<CreateIngredientsOfFoodRequest> IngredientsOfFoodRequest { get; set; }
    }
}