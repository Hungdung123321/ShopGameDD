
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ShopGameDD.Models;

public class Order : IModels
{   
    [BsonId]
    [BsonElement("_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public required string UserId { get; set; }
    public required List<string> Gameids { get; set; }
    public required decimal TotalMoney { get; set; }
    public required DateTime DatePurchased { get; set; }
}
