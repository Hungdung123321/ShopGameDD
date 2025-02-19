using ShopGameDD.Context;
using ShopGameDD.Models;

namespace ShopGameDD.Repositories.bundle;

public class BundleRepository : BaseRepository<Bundle>, IBundleRepository
{
    public BundleRepository(IMongoDbContext mongoContext) : base(mongoContext)
    {
    }
}

