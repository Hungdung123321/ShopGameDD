using ShopGameDD.Models;

namespace ShopGameDD.Requests.order;

public class OrderRq
{   
    public string? Id { get; set; } =null;
    public required string UserId { get; set; }
    public required List<string> Gameids { get; set; }
    public required decimal TotalMoney { get; set; }
    public required DateTime DatePurchased { get; set; }
}