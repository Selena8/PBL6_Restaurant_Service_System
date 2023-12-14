
namespace pbl6_be.Transfers.Responses
{
    public class GetCategoryResponse
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
       
    }
}
