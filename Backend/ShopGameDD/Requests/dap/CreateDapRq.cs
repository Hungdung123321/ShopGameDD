
using MongoDB.Bson;

namespace ShopGameDD.Requests.dap;

public class CreateDapRq
{
    public required string LeaderId { get; set; }
    public required string Name { get; set; }
    public string? Website { get; set; }
    public string? Country { get; set; }
    public string? Taxid { get; set; }
    public string? logoUrl { get; set; }
    public string? AboutContent { get; set; }
}