using ShopGameDD.Context;
using ShopGameDD.Models;

namespace ShopGameDD.Repositories.comment;
public class CommentRepository : BaseRepository<Comment>, ICommentRepository
{
    public CommentRepository(IMongoDbContext mongoContext) : base(mongoContext)
    {
        
    }
}


