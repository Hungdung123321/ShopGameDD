
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ShopGameDD.Models;

public class Payment : IModels
{   
    [BsonId]
    [BsonElement("_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public required string UserId { get; set; }
    public required string Status { get; set; }
    public required string TelecomName { get; set; }
    public required string seri { get; set; }
    public required string code { get; set; }
    public required decimal faceValue { get; set; }
    public required DateTime Time { get; set; }
}
