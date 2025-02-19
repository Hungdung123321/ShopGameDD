using ShopGameDD.Models;

namespace ShopGameDD.Repositories.order;

public interface IOrderRepository : IBaseRepository<Order>
{
    Task CreateOrder(Order order);
    Task<IEnumerable<Order>> GetUserOrders(string userid);
}