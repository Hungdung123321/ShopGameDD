using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ShopGameDD.Context;
using ShopGameDD.Models;

namespace ShopGameDD.Repositories.order;
public class OrderRepository : BaseRepository<Order>, IOrderRepository
{
    protected readonly IMongoDbContext _mongoContext;
    protected IMongoCollection<User> _dbCollectionUser;
    protected IMongoCollection<Game> _dbCollectionGame;
    protected IMongoCollection<Order> _dbCollectionOrder;
    public OrderRepository(IMongoDbContext mongoContext) : base(mongoContext)
    {
        _mongoContext = mongoContext;
        _dbCollectionUser = _mongoContext.GetCollection<User>(typeof(User).Name);
        _dbCollectionGame = _mongoContext.GetCollection<Game>(typeof(Game).Name);
        _dbCollectionOrder = _mongoContext.GetCollection<Order>(typeof(Order).Name);
    }

    public async Task CreateOrder(Order order)
    {
        await CreateAsync(order);
    }

    public async Task<IEnumerable<Order>> GetUserOrders(string userid)
    {
        FilterDefinition<Order> filter = Builders<Order>.Filter.Eq(p => p.UserId,userid);

        return await _dbCollectionOrder.Find(filter).ToListAsync();
    }
}


