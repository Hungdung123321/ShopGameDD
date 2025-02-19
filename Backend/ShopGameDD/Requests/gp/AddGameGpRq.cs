

using ShopGameDD.Models;

namespace ShopGameDD.Requests.gp;

public class AddGameGpRq
{
    public required string userId { get; set; }
    public required List<string> gameids { get; set; }
}