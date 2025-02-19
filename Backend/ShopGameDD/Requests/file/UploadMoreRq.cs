
namespace ShopGameDD.Requests.file;

public class UploadMoreRq
{
    public required IEnumerable<IFormFile> Files { get; set; }
    public required string Namefolder { get; set; }
}