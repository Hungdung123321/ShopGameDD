using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ShopGameDD.Models;

public class Game : IModels
{   
    [BsonId]
    [BsonElement("_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    [BsonElement("Name")]
    public required string Name { get; set; }
    [BsonElement("Serie")]
    public Serie? Serie { get; set; }
    [BsonElement("Description")]
    public required string Description { get; set; }
    [BsonElement("About")]
    public required string About { get; set; }
    [BsonElement("SystemRequirement")]
    public required string SystemRequirement { get; set; }
    [BsonElement("ReleasedDate")]
    public required DateTime ReleasedDate { get; set; }
    // [BsonElement("MetacriticScore")]
    // public required int MetacriticScore { get; set; }
    [BsonElement("Price")]
    public required decimal Price { get; set; } 
    [BsonElement("DeveloperId")]
    public required string DeveloperId { get; set; }

    [BsonElement("ImageUrl")]
    public required string ImageUrl { get; set; }

    [BsonElement("MoreImageUrls")]
    public List<string> MoreImageUrls { get; set; } = [];

    [BsonElement("Genres")]
    public List<string> Genres { get; set; } = [];
    
    [BsonElement("Version")]
    [JsonConverter(typeof(JsonStringEnumConverter))]  
    [BsonRepresentation(BsonType.String)]   
    public GameVersion version { get; set; } = GameVersion.Standard;

    [BsonElement("Features")]
    public List<string> Features { get; set; } = [];

    // [BsonElement("Pegi")]
    // [JsonConverter(typeof(JsonStringEnumConverter))]  
    // [BsonRepresentation(BsonType.String)] 
    // public Pegi pegi { get; set; }

    // [BsonElement("BaseGameId")]
    // public string? BaseGameId { get; set; } = null;
}

public enum GameVersion
{    
    Standard, 
    Deluxe, 
    Premium, 
    Ultimates, 
    EarlyAccess, 
    Demo, 
    Patch, 
    DLC, 
    SoundTrack
}

public enum GameFeatures
{
    Singleplayer,
    Multiplayer,
    Coop,
    OnlineCoop,
    SplitScreen,
    CrossPlatformMultiplayer,
}

public enum Pegi
{
    Pegi7,
    Pegi12,
    Pegi13,
    Pegi16,
    Pegi18,
}