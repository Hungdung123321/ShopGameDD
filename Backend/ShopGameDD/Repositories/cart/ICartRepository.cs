using ShopGameDD.Models;
using ShopGameDD.Repositories;

namespace ShopGameDD.Repositories.cart;

public interface ICartRepository : IBaseRepository<Cart>
{
    Task<Cart> GetCartByGameUser(string gameid, string userid);
    Task<IEnumerable<Game>> GetGamesUserId(string userid);
    Task removeUserCart(string userid);
}