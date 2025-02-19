
using ShopGameDD.Models;

namespace ShopGameDD.Requests.game;

public class UpdateGamepRq
{
    public required string Id { get; set; }
    public required string DeveloperId { get; set; }
    public required string Name { get; set; }
    public string? Serie { get; set; }
    public required GameVersion version { get; set; } = GameVersion.Standard;
    public List<string> Features { get; set; } = [];
    public List<string> Genres { get; set; } = [];
    public required DateTime ReleasedDate { get; set; }
    public required decimal Price { get; set; } 
    public required string Description { get; set; }
    public required string About { get; set; }
    public required string SystemRequirement { get; set; }
    public required string imageUrl { get; set; }
    public required List<string> moreImageUrls { get; set; }
    
}