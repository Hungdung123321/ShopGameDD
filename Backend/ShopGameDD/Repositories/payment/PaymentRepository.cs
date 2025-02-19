using MongoDB.Driver;
using ShopGameDD.Context;
using ShopGameDD.Models;

namespace ShopGameDD.Repositories.order_detail;
public class PaymentRepository : BaseRepository<Payment>, IPaymentRepository
{   

    protected readonly IMongoDbContext _mongoContext;
    protected IMongoCollection<Payment> _dbCollectionPayment;

    public PaymentRepository(IMongoDbContext mongoContext) : base(mongoContext)
    {
        _mongoContext = mongoContext;
        _dbCollectionPayment = _mongoContext.GetCollection<Payment>(typeof(Payment).Name);
    }

    public async Task<IEnumerable<Payment>> GetPaymentsByUserId(string userid)
    {
        FilterDefinition<Payment> filter = Builders<Payment>.Filter.Eq(p=>p.UserId,userid);

        return await _dbCollectionPayment.Find(filter).ToListAsync();
    }

    public Task setPaymentStauts(string paymentid)
    {
        throw new NotImplementedException();
    }
}


