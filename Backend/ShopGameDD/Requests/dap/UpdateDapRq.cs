
namespace ShopGameDD.Requests.dap;

public class UpdateDapRq
{   
    public required string Id { get; set; }
    public required string Name { get; set; }
    public string? Website { get; set; }
    public string? Country { get; set; }
}