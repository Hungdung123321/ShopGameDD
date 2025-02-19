using MongoDB.Bson;
using MongoDB.Driver;
using ShopGameDD.Context;
using ShopGameDD.Models;
using ShopGameDD.Repositories.user;

namespace ShopGameDD.Repositories.developerandpublisher;
public class DAPRepository : BaseRepository<DeveloperAndPublisher>, IDAPRepository
{
    protected readonly IMongoDbContext _mongoContext;
    protected IMongoCollection<DeveloperAndPublisher> _dbCollectionDAP;
    protected IMongoCollection<User> _dbCollectionUser;

    public DAPRepository(IMongoDbContext mongoContext) : base(mongoContext)
    {
        _mongoContext = mongoContext;
        _dbCollectionDAP = _mongoContext.GetCollection<DeveloperAndPublisher>(typeof(DeveloperAndPublisher).Name);
        _dbCollectionUser = _mongoContext.GetCollection<User>(typeof(User).Name);
    }

    public async Task AddUserRequestId(string id, string userId)
    {
        var filter = Builders<DeveloperAndPublisher>.Filter.Eq("_id", new ObjectId(id));
        var update = Builders<DeveloperAndPublisher>.Update.AddToSet("UserRequestId", userId); // Use $push for non-unique addition

        await _dbCollectionDAP.UpdateOneAsync(filter, update);

        DeveloperAndPublisher dap = await GetAsync(id);

        dap.Website = null;
        dap.AboutContent = null;
        dap.Country = null;
        dap.Taxid = null;
        dap.Follower = null;
        dap.Series = null;
        dap.UserRequestId = null;
        dap.UsersId = null;
        dap.TotalRevenue = null;

        var filter2 = Builders<User>.Filter.Eq("_id", new ObjectId(userId));
        var update2 = Builders<User>.Update.Push("RequstToTeam", dap);


        await _dbCollectionUser.UpdateOneAsync(filter2, update2);
    }

    public async Task AddUserToTeam(string teamid, string userId)
    {
        var filter = Builders<DeveloperAndPublisher>.Filter.Eq("_id", new ObjectId(teamid));
        var update = Builders<DeveloperAndPublisher>.Update.Push(p => p.UsersId, userId);

        await _dbCollectionDAP.UpdateOneAsync(filter, update);
    }

    public async Task CancelUserToTeam(string teamid, string userId)
    {
        // var filter = Builders<DeveloperAndPublisher>.Filter.Eq("_id", new ObjectId(teamid));
        // var update = Builders<DeveloperAndPublisher>.Update.Pull(p => p.UsersId, userId);

        // await _dbCollectionDAP.UpdateOneAsync(filter, update);
    }

    public async Task<bool> CheckMemberExist(string id, string userId)
    {
        var filter = Builders<DeveloperAndPublisher>.Filter.And(
            Builders<DeveloperAndPublisher>.Filter.Eq("_id", new ObjectId(id)),
            Builders<DeveloperAndPublisher>.Filter.AnyEq("UsersId", userId)
        );
        var result = await _dbCollectionDAP.Find(filter).FirstOrDefaultAsync();
        return result != null;
    }

    public async Task<bool> CheckUserRequestExist(string id, string userId)
    {
        var filter = Builders<DeveloperAndPublisher>.Filter.And(
            Builders<DeveloperAndPublisher>.Filter.AnyEq("_id", new ObjectId(id)),
            Builders<DeveloperAndPublisher>.Filter.AnyEq("UserRequestId", userId)
        );
        var result = await _dbCollectionDAP.Find(filter).FirstOrDefaultAsync();
        return result != null;
    }

    public async Task<IEnumerable<User>> GetAllMemberByTeamId(string teamid)
    {
        var filter = Builders<DeveloperAndPublisher>.Filter.Eq("_id", new ObjectId(teamid));
        var userids = await _dbCollectionDAP.Find(filter).FirstOrDefaultAsync();

        var objectIds = new List<ObjectId>();

        foreach (var id in userids.UsersId)
        {
            if (ObjectId.TryParse(id, out var objectId))
            {
                objectIds.Add(objectId);
            }
        }

        var filter2 = Builders<User>.Filter.In("_id", objectIds);
        var result = await _dbCollectionUser.Find(filter2).ToListAsync();

        return result;
    }

    public async Task<DeveloperAndPublisher> getImageAndName(string teamid)
    {
        var filter = Builders<DeveloperAndPublisher>.Filter.Eq("_id", new ObjectId(teamid));
        var projection = Builders<DeveloperAndPublisher>.Projection
        .Include("logoUrl")
        .Include("Name");
        return await _dbCollectionDAP.Find(filter).Project<DeveloperAndPublisher>(projection).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<User>> GetUsersRequestByTeamId(string teamid)
    {
        var filter = Builders<DeveloperAndPublisher>.Filter.Eq("_id", new ObjectId(teamid));
        var userids = await _dbCollectionDAP.Find(filter).FirstOrDefaultAsync();

        var objectIds = new List<ObjectId>();

        foreach (var id in userids.UserRequestId)
        {
            if (ObjectId.TryParse(id, out var objectId))
            {
                objectIds.Add(objectId);
            }
        }

        var filter2 = Builders<User>.Filter.In("_id", objectIds);
        var result = await _dbCollectionUser.Find(filter2).ToListAsync();

        return result;
    }

    public async Task RemoveUserRequestId(string id, string userId)
    {
        var filter = Builders<DeveloperAndPublisher>.Filter.Eq("_id", new ObjectId(id));
        var update = Builders<DeveloperAndPublisher>.Update.Pull("UserRequestId", userId);

        await _dbCollectionDAP.UpdateOneAsync(filter, update);
    }

    public async Task<IEnumerable<DeveloperAndPublisher>> SearchTeamsAsync(string searchTerm)
    {
        var filter = Builders<DeveloperAndPublisher>.Filter.Regex(p => p.Name, new BsonRegularExpression(searchTerm, "i"));
        return await _dbCollectionDAP.Find(filter).ToListAsync();
    }
}


