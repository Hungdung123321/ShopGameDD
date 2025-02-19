

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ShopGameDD.Models;
using ShopGameDD.Response;

namespace ShopGameDD.Repositories.jwt;

public class jwtRepository : IjwtRepository
{
    public const string SecretKey = "asdsadsdsadsafghfoierrenrenjgnreogreokmfreofkmerokmerfokremfreomokmewomewoidmewoidj"; // Use a strong key in production!
    public const string Issuer = "yourdomain.com";
    public const string Audience = "yourdomain.com";

    public string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim("name", user.Name)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: Issuer,
            audience: Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public ClaimsPrincipal ValidateJwtToken(string token)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
        var tokenHandler = new JwtSecurityTokenHandler();

        try
        {
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidIssuer = Issuer,
                ValidAudience = Audience,
                IssuerSigningKey = key,
                ClockSkew = TimeSpan.Zero // to eliminate clock skew
            }, out var validatedToken);

            return principal;
        }
        catch
        {
            return null; // Invalid token
        }
    }
}
