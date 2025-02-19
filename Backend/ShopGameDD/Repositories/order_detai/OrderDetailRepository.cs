using ShopGameDD.Context;
using ShopGameDD.Models;

namespace ShopGameDD.Repositories.order_detail;
public class OrderDetailRepository : BaseRepository<OrderDetail>, IOrderDetailRepository
{
    public OrderDetailRepository(IMongoDbContext mongoContext) : base(mongoContext)
    {
        
    }
}


