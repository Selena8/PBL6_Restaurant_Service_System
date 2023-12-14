
using pbl6_be.Domain.Models.Schemas;
using pbl6_be.Transfers.Requests;
using pbl6_be.Transfers.Responses;
using static pbl6_be.Common.Enum;

namespace pbl6_be.Services
{
    public interface IVnPayService
    {
        Task<string> CreatePaymentUrl(CreatePaymentRequest request, HttpContext context, UserType userType);
        Task PaymentExecute(IQueryCollection collections);
        Task ConfirmPayment(int paymentId);
        Task<Pagination<Payment>> Get(int orderId);
        Task<Pagination<Payment>> GetAll(GetAllPaymentRequest request);
    }
}