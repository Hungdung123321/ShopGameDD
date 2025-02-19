
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ShopGameDD.Models;

public class OrderDetail : IModels
{   
    [BsonId]
    [BsonElement("_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public required string OrderId { get; set; }
    public required decimal BundleId { get; set; }
    public required OrderFor For { get; set; } = OrderFor.MyAccount;
    public string? UserIdGifted { get; set; } = null;
    public decimal PriceAtPurchased { get; set; } = 0;
}

public enum OrderFor
{
    MyAccount,
    Gift,
}