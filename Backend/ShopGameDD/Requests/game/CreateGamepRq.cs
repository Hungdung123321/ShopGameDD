
using System.Text.Json.Serialization;
using ShopGameDD.Models;

namespace ShopGameDD.Requests.game;

public class CreateGamepRq
{
    public required string Name { get; set; }
    public required string Developer { get; set; }

    public Serie? Serie { get; set; }
    public required GameVersion version { get; set; } = GameVersion.Standard;
    public required List<string> Genres { get; set; } = [];
    public required List<string> Features { get; set; } =[];
    public required string Description { get; set; }
    public required string About { get; set; }
    public required string SystemRequirement { get; set; }
    public required DateTime ReleasedDate { get; set; }
    public required decimal Price { get; set; }
    public required string ImageUrl { get; set; }
    public required List<string> ImageUrls { get; set; }
}