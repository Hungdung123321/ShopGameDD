using ShopGameDD.Models;

namespace ShopGameDD.Requests.order;

public class Getgamesrq
{   
    public required List<string> Gameids { get; set; }
}