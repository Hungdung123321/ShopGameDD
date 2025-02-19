
using MongoDB.Bson;
using ShopGameDD.Models;

namespace ShopGameDD.Requests.user;

public class UpdateUserRq
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string Gmail { get; set; }
    public required string Password { get; set; }
}