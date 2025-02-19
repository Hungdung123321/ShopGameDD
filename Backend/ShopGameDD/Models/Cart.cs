using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ShopGameDD.Models;
public class Cart : IModels
{   
    [BsonId]
    [BsonElement("_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("UserId")]
    public required string UserId { get; set; }
    [BsonElement("GameId")]
    public required string GameId { get; set; }
}