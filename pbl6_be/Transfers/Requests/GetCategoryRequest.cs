namespace pbl6_be.Transfers.Requests
{
    public class GetCategoryRequest
    {
        public int Limit { get; set; } = 15;
        public int Offset { get; set; } = 0;
        public string Search { get; set; } = "";
        public string SortBy { get; set; } = "Id";
        public string Direction { get; set; } = "DESC";
    }
}
