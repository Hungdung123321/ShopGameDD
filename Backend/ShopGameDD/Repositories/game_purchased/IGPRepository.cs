using ShopGameDD.Models;

namespace ShopGameDD.Repositories.game_purchased;

public interface IGPRepository : IBaseRepository<GamePurchased>
{
    Task AddGameToUser(string userId,List<string> gameids);
    Task<IEnumerable<Game>> GetGamesGpByUserId(string userId);
    Task<bool> checkGameUserPurchased(string userId,string gameid);
    Task<long> CountGameidInGP(string gameid);
}