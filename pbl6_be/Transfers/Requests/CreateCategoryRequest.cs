using System.ComponentModel.DataAnnotations;

namespace pbl6_be.Transfers.Requests
{
    public class CreateCategoryRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
