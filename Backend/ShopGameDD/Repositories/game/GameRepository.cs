using MongoDB.Driver;
using ShopGameDD.Context;
using ShopGameDD.Models;

namespace ShopGameDD.Repositories.game;

public class GameRepository : BaseRepository<Game>, IGameRepository
{

    protected readonly IMongoDbContext _mongoContext;
    protected IMongoCollection<Game> _dbCollectionGame;

    public GameRepository(IMongoDbContext mongoContext) : base(mongoContext)
    {
        _mongoContext = mongoContext;
        _dbCollectionGame = _mongoContext.GetCollection<Game>(typeof(Game).Name);
    }

    public async Task<IEnumerable<Game>> GetFilteredGames(GameFilter filters)
    {
        var filterBuilder = Builders<Game>.Filter;
        var filter = FilterDefinition<Game>.Empty;
        // Apply Genre filter
        if (filters.Genres != null && filters.Genres.Any())
        {
            filter &= filterBuilder.In("Genres", filters.Genres);
        }
        // Apply MinPrice filter
        if (filters.MinPrice.HasValue)
        {
            filter &= filterBuilder.Gte(game => game.Price, filters.MinPrice);
        }

        // Apply MaxPrice filter
        if (filters.MaxPrice.HasValue)
        {
            filter &= filterBuilder.Lte(game => game.Price, filters.MaxPrice);
        }

        // Apply ReleaseYear filter
        if (filters.ReleaseYear != null && filters.ReleaseYear.Any())
        {
            var yearFilters = new List<FilterDefinition<Game>>();
            foreach (var year in filters.ReleaseYear)
            {
                var startOfYear = new DateTime(year, 1, 1);
                var startOfNextYear = new DateTime(year + 1, 1, 1);

                // Create filter for each year
                var yearFilter = filterBuilder.Gte(doc => doc.ReleasedDate, startOfYear) &
                                 filterBuilder.Lt(doc => doc.ReleasedDate, startOfNextYear);
                yearFilters.Add(yearFilter);
            }
            filter &= filterBuilder.Or(yearFilters);
        }

        // Apply Teams filter
        if (filters.Teams != null && filters.Teams.Any())
        {
            filter &= filterBuilder.In(game => game.DeveloperId, filters.Teams);
        }

        // Apply Search term filter (partial search)
        if (!string.IsNullOrEmpty(filters.Search))
        {
            var regex = new MongoDB.Bson.BsonRegularExpression(filters.Search, "i"); // "i" for case-insensitive search
            filter &= filterBuilder.Regex(game => game.Name, regex);
        }
        

        var projection = Builders<Game>.Projection
        .Exclude("Description")
        .Exclude("About")
        .Exclude("SystemRequirement");
        var games = await _dbCollectionGame.Find(filter).Project<Game>(projection).ToListAsync();
        if (filters.OrderType.HasValue)
        {
            switch (filters.OrderType)
            {
                case Ordertype.Name_A_to_Z:
                    games = await _dbCollectionGame.Find(filter).Project<Game>(projection).SortBy(game => game.Name).ToListAsync();
                    break;
                case Ordertype.Name_Z_to_A:
                    games = await _dbCollectionGame.Find(filter).Project<Game>(projection).SortByDescending(game => game.Name).ToListAsync();
                    break;
                case Ordertype.Price_Low_to_High:
                    games = await _dbCollectionGame.Find(filter).Project<Game>(projection).SortBy(game => game.Price).ToListAsync();
                    break;
                case Ordertype.Price_High_to_Low:
                    games = await _dbCollectionGame.Find(filter).Project<Game>(projection).SortByDescending(game => game.Price).ToListAsync();
                    break;
                case Ordertype.Date_Oldest_to_latest:
                    games = await _dbCollectionGame.Find(filter).Project<Game>(projection).SortByDescending(game => game.ReleasedDate).ToListAsync();
                    break;
                case Ordertype.Date_latest_to_Oldest:
                    games = await _dbCollectionGame.Find(filter).Project<Game>(projection).SortBy(game => game.ReleasedDate).ToListAsync();
                    break;
            }
        }
        return games;
    }

    public async Task<IEnumerable<Game>> GetTeamGames(string teamid)
    {
        FilterDefinition<Game> filter = Builders<Game>.Filter.Eq(p=>p.DeveloperId,teamid);

        var projection = Builders<Game>.Projection
        .Exclude("Description")
        .Exclude("About")
        .Exclude("SystemRequirement");

        return await _dbCollectionGame.Find(filter).Project<Game>(projection).ToListAsync();
    }

    public async Task<IEnumerable<Game>> GetTeamGamesV2(string teamid)
    {
        FilterDefinition<Game> filter = Builders<Game>.Filter.Eq(p=>p.DeveloperId,teamid);

        return await _dbCollectionGame.Find(filter).ToListAsync();
    }

    public async Task<Game> GetGame(string gameid)
    {
        FilterDefinition<Game> filter = Builders<Game>.Filter.Eq(p=>p.Id,gameid);

        var projection = Builders<Game>.Projection
        .Include("Price");

        return await _dbCollectionGame.Find(filter).Project<Game>(projection).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Game>> GetGames()
    {
        FilterDefinition<Game> filter = Builders<Game>.Filter.Empty;

        var projection = Builders<Game>.Projection
        .Exclude("Description")
        .Exclude("About")
        .Exclude("SystemRequirement");

        return await _dbCollectionGame.Find(filter).Project<Game>(projection).ToListAsync();
    }

    public async Task<IEnumerable<Game>> GetGames(List<string> gameids)
    {
        FilterDefinition<Game> filter = Builders<Game>.Filter.In(p=>p.Id,gameids);

        var projection = Builders<Game>.Projection
        .Include(p=>p.Id)
        .Include("Name")
        .Include("Version")
        .Include("Price")
        .Include("ImageUrl");

        return await _dbCollectionGame.Find(filter).Project<Game>(projection).ToListAsync();
    }

    public async Task<long> GetCountGames()
    {
        FilterDefinition<Game> filter = Builders<Game>.Filter.Empty;

        var projection = Builders<Game>.Projection
        .Include(p=>p.Id);

        return await _dbCollectionGame.Find(filter).Project<Game>(projection).CountDocumentsAsync();
    }
}

