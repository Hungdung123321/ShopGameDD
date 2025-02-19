
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ShopGameDD.Models;

public class Comment : IModels
{   
    [BsonId]
    [BsonElement("_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public required string UserId { get; set; }
    public required string GameId { get; set; }
    public required DateTime DatePurchased { get; set; }
}