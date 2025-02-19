using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace ShopGameDD.Context;

public interface IMongoDbContext
{
    public IMongoCollection<T> GetCollection<T>(string name);

    public IGridFSBucket GetGridFSBucket();
}