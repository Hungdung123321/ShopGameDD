namespace ShopGameDD.Models;
public class GameFilter
{
    public List<string>? Genres { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public List<int>? ReleaseYear { get; set; }
    public List<string>? Teams { get; set; }
    public string? Search { get; set; }
    public Ordertype? OrderType { get; set; }
}

public enum Ordertype
{
    Name_A_to_Z,
    Name_Z_to_A,
    Price_Low_to_High,
    Price_High_to_Low,
    Date_Oldest_to_latest,
    Date_latest_to_Oldest,
}
