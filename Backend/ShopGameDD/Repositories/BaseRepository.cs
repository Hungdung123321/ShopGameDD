using MongoDB.Bson;
using MongoDB.Driver;
using ShopGameDD.Context;
using ShopGameDD.Models;

namespace ShopGameDD.Repositories;

public class BaseRepository<T> : IBaseRepository<T> where T : class, IModels
{   
    protected readonly IMongoDbContext _mongoContext;
    protected IMongoCollection<T> _dbCollection;

    protected BaseRepository(IMongoDbContext mongoContext)
    {
        _mongoContext = mongoContext;
        _dbCollection = _mongoContext.GetCollection<T>(typeof(T).Name);
    }
   
    public async Task<IEnumerable<T>> GetsAsync()
    {
        IAsyncCursor<T> cursor = await Query(Builders<T>.Filter.Empty);
        return await cursor.ToListAsync();
    }

    public async Task<T> GetAsync(string id)
    {   
        ObjectId objectId = new ObjectId(id);
        FilterDefinition<T> filter = Builders<T>.Filter.Eq("_id",objectId);
        IAsyncCursor<T> query = await Query(filter);
        
        return await query.FirstOrDefaultAsync();
    }

     public async Task CreateAsync(T obj)
    {   
        ArgumentNullException.ThrowIfNull(obj,nameof(obj));
        await _dbCollection.InsertOneAsync(obj);
    }

    public async Task UpdateAsync(string id, T obj)
    {
        ObjectId objectId = new ObjectId(id);
        FilterDefinition<T> filter = Builders<T>.Filter.Eq("_id",objectId);

        await _dbCollection.ReplaceOneAsync(filter,obj);
    }

    public async Task RemoveAsync(string id)
    {
        ObjectId objectId = new ObjectId(id);
        FilterDefinition<T> filter = Builders<T>.Filter.Eq("_id",objectId);

        await _dbCollection.DeleteOneAsync(filter);
    }

    public async Task<IAsyncCursor<T>> Query(FilterDefinition<T> filter)
    {   
        return await _dbCollection.FindAsync(filter);
    }

}