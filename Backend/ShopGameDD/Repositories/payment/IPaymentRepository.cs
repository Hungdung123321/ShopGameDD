using ShopGameDD.Models;

namespace ShopGameDD.Repositories.order_detail;

public interface IPaymentRepository : IBaseRepository<Payment>
{
    Task<IEnumerable<Payment>> GetPaymentsByUserId(string userid);
    Task setPaymentStauts(string paymentid);
}