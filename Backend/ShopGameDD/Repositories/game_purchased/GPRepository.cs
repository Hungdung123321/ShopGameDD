using MongoDB.Bson;
using MongoDB.Driver;
using ShopGameDD.Context;
using ShopGameDD.Models;

namespace ShopGameDD.Repositories.game_purchased;

public class GPRepository : BaseRepository<GamePurchased>, IGPRepository
{
    protected readonly IMongoDbContext _mongoContext;
    protected IMongoCollection<GamePurchased> _dbCollectionGamePurchased;
    protected IMongoCollection<Game> _dbCollectionGame;
    public GPRepository(IMongoDbContext mongoContext) : base(mongoContext)
    {
        _mongoContext = mongoContext;
        _dbCollectionGamePurchased = _mongoContext.GetCollection<GamePurchased>(typeof(GamePurchased).Name);
        _dbCollectionGame = _mongoContext.GetCollection<Game>(typeof(Game).Name);
    }

    public async Task AddGameToUser(string userId, List<string> gameids)
    {
        var filter = Builders<GamePurchased>.Filter.Eq(p => p.UserId, userId);
        var update = Builders<GamePurchased>.Update.AddToSetEach(p => p.GameIds, gameids);

        await _dbCollectionGamePurchased.UpdateOneAsync(filter, update);
    }

    public async Task<bool> checkGameUserPurchased(string userId, string gameid)
    {
        var filter = Builders<GamePurchased>.Filter.And(
            Builders<GamePurchased>.Filter.Eq(p => p.UserId, userId),
            Builders<GamePurchased>.Filter.AnyEq(p => p.GameIds, gameid)
        );

        var count = await _dbCollectionGamePurchased.CountDocumentsAsync(filter);
        return count > 0;
    }

    public async Task<IEnumerable<Game>> GetGamesGpByUserId(string userId)
    {
        var filter = Builders<GamePurchased>.Filter.Eq(p => p.UserId, userId);
        var userGp = await _dbCollectionGamePurchased.Find(filter).FirstOrDefaultAsync();
        var objectIds = userGp.GameIds.Select(p => new ObjectId(p)).ToList();

        var filter2 = Builders<Game>.Filter.In("_id", objectIds);

        var projection = Builders<Game>.Projection
        .Exclude("Description")
        .Exclude("About")
        .Exclude("SystemRequirement");

        var games = await _dbCollectionGame.Find(filter2).Project<Game>(projection).ToListAsync();

        if (games is not null)
        {
            return games;
        }
        else
        {
            return [];
        }
    }

    public async Task<long> CountGameidInGP(string gameid)
    {
        // Define the filter
        var filter = Builders<GamePurchased>.Filter.AnyEq(doc => doc.GameIds, gameid);

        // Count the documents
        var count = await _dbCollectionGamePurchased.CountDocumentsAsync(filter);
        return count;
    }
}

