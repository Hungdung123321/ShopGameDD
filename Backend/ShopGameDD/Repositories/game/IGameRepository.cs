using ShopGameDD.Models;

namespace ShopGameDD.Repositories.game;

public interface IGameRepository : IBaseRepository<Game>
{
     Task<IEnumerable<Game>> GetTeamGames(string teamid);
     Task<IEnumerable<Game>> GetTeamGamesV2(string teamid);
     Task<IEnumerable<Game>> GetFilteredGames(GameFilter filters);
     Task<IEnumerable<Game>> GetGames();
     Task<IEnumerable<Game>> GetGames(List<string> gameids);
     Task<Game> GetGame(string gameid);
     Task<long> GetCountGames();
}