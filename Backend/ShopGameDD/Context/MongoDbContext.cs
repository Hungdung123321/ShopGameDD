using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using ShopGameDD.Options;

namespace ShopGameDD.Context;

public class MongoDbContext : IMongoDbContext
{
    private readonly IMongoDatabase _db;
    private readonly MongoClient _client;

    public MongoDbContext(IOptions<MongoSettings> options)
    {
        _client = new MongoClient(options.Value.ConnectionString);
        _db = _client.GetDatabase(options.Value.DatabaseName);
    }

    public IMongoCollection<T> GetCollection<T>(string name)
    {
       return _db.GetCollection<T>(name);
    }

    public IGridFSBucket GetGridFSBucket()
    {
        return new GridFSBucket(_db);
    }
}