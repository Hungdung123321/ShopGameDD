using MongoDB.Bson;
using MongoDB.Driver;
using ShopGameDD.Context;
using ShopGameDD.Models;
using ShopGameDD.Repositories;

namespace ShopGameDD.Repositories.cart;

public class CartRepository : BaseRepository<Cart>, ICartRepository
{
    protected readonly IMongoDbContext _mongoContext;
    protected IMongoCollection<Cart> _dbCollectionCart;
    protected IMongoCollection<Game> _dbCollectionGame;
    public CartRepository(IMongoDbContext mongoContext) : base(mongoContext)
    {
        _mongoContext = mongoContext;
        _dbCollectionCart = _mongoContext.GetCollection<Cart>(typeof(Cart).Name);
        _dbCollectionGame = _mongoContext.GetCollection<Game>(typeof(Game).Name);
    }

    public async Task<Cart> GetCartByGameUser(string gameid, string userid)
    {
        FilterDefinition<Cart> filter = Builders<Cart>.Filter.And(
            Builders<Cart>.Filter.Eq(p => p.GameId, gameid),
            Builders<Cart>.Filter.Eq(p => p.UserId, userid)
        );

        return await _dbCollectionCart.Find(filter).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Game>> GetGamesUserId(string userid)
    {
        FilterDefinition<Cart> filter = Builders<Cart>.Filter.Eq(p => p.UserId, userid);

        var usercarts = await _dbCollectionCart.Find(filter).ToListAsync();
        var objectIds = usercarts.Select(p => new ObjectId(p.GameId)).ToList();

        var filter2 = Builders<Game>.Filter.In("_id", objectIds);

        var projection = Builders<Game>.Projection
        .Exclude("Description")
        .Exclude("About")
        .Exclude("SystemRequirement");

        return await _dbCollectionGame.Find(filter2).Project<Game>(projection).ToListAsync();
    }

    public async Task removeUserCart(string userid)
    {
        var filter = Builders<Cart>.Filter.Eq(p => p.UserId, userid);
        await _dbCollectionCart.DeleteManyAsync(filter);
    }
}

