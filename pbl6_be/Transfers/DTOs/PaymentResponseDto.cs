namespace pbl6_be.Transfers.DTOs
{
    public class PaymentResponseDto
    {
        public string OrderId { get; set; }
        public string VnPayResponseCode { get; set; }
        public DateTime PayDate { get; set; }
    }
}
