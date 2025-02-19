using System.Security.Claims;
using ShopGameDD.Models;

namespace ShopGameDD.Repositories.jwt;

public interface IjwtRepository{
    string GenerateJwtToken(User user);
    ClaimsPrincipal ValidateJwtToken(string token);
}