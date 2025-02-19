using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ShopGameDD.Models;


public class User : IModels
{   
    [BsonId]
    [BsonElement("_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    
    
    [BsonElement("Name")]
    public required string Name { get; set; }

    [BsonElement("avartarUrl")]
    public string AvartarUrl { get; set; } = "";
    
    [BsonElement("Config")]
    public string? Config { get; set; }

    
    [BsonElement("Wallet")]
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal? Wallet { get; set; }

    
    [BsonElement("Gmail")]
    public required string Gmail { get; set; }

    
    [BsonElement("Password")]
    public required string Password { get; set; }
    public bool? IsInTeam { get; set; } = false;
    public bool? Isleader { get; set; } = false;
    public string? TeamId { get; set; } ="";
    public bool isBlock { get; set; } = false;
    
    [BsonElement("WishList")]
    public IEnumerable<Game>? WishList { get; set; } = null;

    
    [BsonElement("Role")]
    [JsonConverter(typeof(JsonStringEnumConverter))]  // JSON.Net
    [BsonRepresentation(BsonType.String)]         // Mongo
    public UserRole? UserRole { get; set; } = null;
    

    [BsonElement("RequstToTeam")]
    public IEnumerable<DeveloperAndPublisher> RequstToTeam { get; set; } = [];
}

public enum UserRole
{   
    USER,
    DEVELOPER,
    ADMIN,
    LEADER,
    MEMBER,
}