using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ShopGameDD.Models;

public class Bundle : IModels
{   
    [BsonId]
    [BsonElement("_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    
    public required string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; } = 0;
    public int? Sale { get; set; } = null;


    public IEnumerable<Game> Items { get; set; } = [];

    public List<string> ItemVersions { get; set; } = [];

    public List<string> BundleAtGameIds { get; set; } = [];
}