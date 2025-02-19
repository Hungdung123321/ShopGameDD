

using ShopGameDD.Models;

namespace ShopGameDD.Requests.user;

public class CreateUserRq
{
    public required string Name { get; set; }
    public required string Gmail { get; set; }
    public required string Password { get; set; }
    public required UserRole Role { get; set; }
}