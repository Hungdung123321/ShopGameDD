using ShopGameDD.Context;
using ShopGameDD.Models;

namespace ShopGameDD.Repositories.genre;
public class GenreRepository : BaseRepository<Genre>, IGenreRepository
{
    public GenreRepository(IMongoDbContext mongoContext) : base(mongoContext)
    {
        
    }
}


