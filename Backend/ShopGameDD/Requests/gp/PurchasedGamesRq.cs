using ShopGameDD.Models;

namespace ShopGameDD.Requests.gp;

public class PurchasedGamesRq
{
    public required string userId { get; set; }
    public required List<string> gameids { get; set; }
    public required decimal TotalMoney { get; set; }
    public required DateTime DatePurchased { get; set; }
}