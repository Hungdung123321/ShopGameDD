
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ShopGameDD.Models;

public class DeveloperAndPublisher : IModels
{   
    [BsonId]
    [BsonElement("_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    public string? LeaderId { get; set; }

    public required string Name { get; set; }

    public string? Website { get; set; }

    public string? Country { get; set; }
    public string? logoUrl { get; set; }
    public string? AboutContent { get; set; }
    public string? Taxid { get; set; }
    public int? Follower { get; set; } = 0;
    public decimal? TotalRevenue { get; set; } =0;

    public IEnumerable<string> Series { get; set; } = [];
    
    public List<string> UserRequestId { get; set; } = [];

    public List<string> UsersId { get; set; } = [];

    [BsonElement("Type")]
    [JsonConverter(typeof(JsonStringEnumConverter))]  // JSON.Net
    [BsonRepresentation(BsonType.String)]   
    public DeveloperOrPublisher Type { get; set; }
}

public enum DeveloperOrPublisher
{
    DEVELOPER,
    PUBLISHER
}