
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ShopGameDD.Models;

public class Genre : IModels
{   
    [BsonId]
    [BsonElement("_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public required string Name { get; set; }
}
