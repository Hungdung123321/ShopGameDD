using System.Transactions;
using MongoDB.Bson;
using MongoDB.Driver;
using ShopGameDD.Context;
using ShopGameDD.Models;

namespace ShopGameDD.Repositories.user;
public class UserRepository : BaseRepository<User>, IUserRepository
{
    protected readonly IMongoDbContext _mongoContext;
    protected IMongoCollection<User> _dbCollectionUser;
    protected IMongoCollection<GamePurchased> _dbCollectionGP;
    public UserRepository(IMongoDbContext mongoContext) : base(mongoContext)
    {
        _mongoContext = mongoContext;
        _dbCollectionUser = _mongoContext.GetCollection<User>(typeof(User).Name);
        _dbCollectionGP = _mongoContext.GetCollection<GamePurchased>(typeof(GamePurchased).Name);
    }

    public async Task<bool> CheckGmail(string Gmail)
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("Gmail", Gmail);
        bool exists = await _dbCollectionUser.Find(filter).AnyAsync();

        return exists;
    }


    public async Task<User> Login(string Gmail, string password)
    {
        FilterDefinition<User> filter = Builders<User>.Filter.And(
            Builders<User>.Filter.Eq("Gmail", Gmail),
            Builders<User>.Filter.Eq("Password", password)
        );

        return await _dbCollectionUser.Find(filter).FirstOrDefaultAsync();
    }

    public async Task CreateUserAsync(User user)
    {
        await CreateAsync(user);
        if (user.UserRole == UserRole.USER)
        {
            await CreateUserLibary(user);
        }
    }

    private async Task CreateUserLibary(User user)
    {

        GamePurchased gp = new GamePurchased()
        {
            UserId = user.Id,
            GameIds = []
        };

        await _dbCollectionGP.InsertOneAsync(gp);
    }

    public async Task RemoveMyRequestToteam(string userid, DeveloperAndPublisher dap)
    {
        dap.Website = null;
        dap.AboutContent = null;
        dap.Country = null;
        dap.Taxid = null;
        dap.Follower = null;
        dap.Series = null;
        dap.UserRequestId = null;
        dap.UsersId = null;
        dap.TotalRevenue = null;

        FilterDefinition<User> filter = Builders<User>.Filter.Eq("_id", new ObjectId(userid));
        UpdateDefinition<User> update = Builders<User>.Update.Pull("RequstToTeam", dap);

        await _dbCollectionUser.UpdateOneAsync(filter, update);
    }

    public async Task setUserTeamId(string userid, string teamid)
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("_id", ObjectId.Parse(userid));
        UpdateDefinition<User> update = Builders<User>.Update.Set(p => p.TeamId, teamid);

        await _dbCollectionUser.UpdateOneAsync(filter, update);
    }

    public async Task setUserIsLeader(string userid, bool value)
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("_id", ObjectId.Parse(userid));
        UpdateDefinition<User> update = Builders<User>.Update.Set(p => p.Isleader, value);

        await _dbCollectionUser.UpdateOneAsync(filter, update);
    }

    public async Task setUserIsInTeam(string userid, bool value)
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("_id", ObjectId.Parse(userid));
        UpdateDefinition<User> update = Builders<User>.Update.Set(p => p.IsInTeam, value);

        await _dbCollectionUser.UpdateOneAsync(filter, update);
    }

    public async Task setUserRole(string userid, UserRole value)
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("_id", ObjectId.Parse(userid));
        UpdateDefinition<User> update = Builders<User>.Update.Set(p => p.UserRole, value);

        await _dbCollectionUser.UpdateOneAsync(filter, update);
    }

    public async Task<long> getUserCount()
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq(p=>p.UserRole, UserRole.USER);

        var projection = Builders<User>.Projection
        .Include(p=>p.Id);

        return await _dbCollectionUser.Find(filter).Project<User>(projection).CountDocumentsAsync();
    }

    public async Task<long> getDAPCount()
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq(p=>p.UserRole, UserRole.DEVELOPER);

        var projection = Builders<User>.Projection
        .Include(p=>p.Id);

        return await _dbCollectionUser.Find(filter).Project<User>(projection).CountDocumentsAsync();
    }

    public async Task<long> getAdminCount()
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq(p=>p.UserRole, UserRole.ADMIN);

        var projection = Builders<User>.Projection
        .Include(p=>p.Id);

        return await _dbCollectionUser.Find(filter).Project<User>(projection).CountDocumentsAsync();
    }

    public async Task setAvatar(string imgurl,string userid)
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("_id", ObjectId.Parse(userid));
        UpdateDefinition<User> update = Builders<User>.Update.Set(p => p.AvartarUrl, imgurl);

        await _dbCollectionUser.UpdateOneAsync(filter, update);
    }

    public async Task setToAdmin(string userid)
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("_id", ObjectId.Parse(userid));
        UpdateDefinition<User> update = Builders<User>.Update.Set(p => p.UserRole, UserRole.ADMIN);

        await _dbCollectionUser.UpdateOneAsync(filter, update);
    }

    
    public async Task setToDev(string userid)
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("_id", ObjectId.Parse(userid));
        UpdateDefinition<User> update = Builders<User>.Update.Set(p => p.UserRole, UserRole.DEVELOPER);

        await _dbCollectionUser.UpdateOneAsync(filter, update);
    }

    public async Task setToUser(string userid)
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Eq("_id", ObjectId.Parse(userid));
        UpdateDefinition<User> update = Builders<User>.Update.Set(p => p.UserRole, UserRole.USER);

        await _dbCollectionUser.UpdateOneAsync(filter, update);
    }

    public async Task<IEnumerable<User>> getAllUser()
    {
        FilterDefinition<User> filter = Builders<User>.Filter.Empty;
        return await _dbCollectionUser.Find(filter).ToListAsync();
    }
}