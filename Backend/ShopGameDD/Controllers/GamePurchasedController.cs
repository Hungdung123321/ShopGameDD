using Microsoft.AspNetCore.Mvc;
using ShopGameDD.Models;
using ShopGameDD.Repositories.game;
using ShopGameDD.Repositories.game_purchased;
using ShopGameDD.Repositories.genre;
using ShopGameDD.Repositories.user;
using ShopGameDD.Requests.genre;
using ShopGameDD.Requests.gp;

namespace ShopGameDD.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class GamePurchasedController : ControllerBase
{
    private readonly IGPRepository _GPRepository;
    private readonly IGameRepository _GameRepository;
    private readonly IUserRepository _UserRepository;
    public GamePurchasedController(IGPRepository gPRepository,IGameRepository gameRepository,IUserRepository userRepository)
    {
        _GPRepository = gPRepository;
        _GameRepository = gameRepository;
        _UserRepository = userRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetGps()
    {
        IEnumerable<GamePurchased> gp = await _GPRepository.GetsAsync();

        return Ok(gp);
    }

    [HttpGet("{gameid}")]
    public async Task<IActionResult> GetRevenue(string gameid)
    {   
        Game game = await _GameRepository.GetGame(gameid);

        if (game is null)
        {
            return BadRequest("Game Not found");
        }
        long count = await _GPRepository.CountGameidInGP(gameid);

        return Ok(new {revenue = count*game.Price});
    }

    [HttpPut()]
    public async Task<IActionResult> AddGamePurchaseToUser(AddGameGpRq rq)
    {
        User user = await _UserRepository.GetAsync(rq.userId);

        if (user is null)
        {
            return BadRequest("User Not found");
        }

        // Game game = await _GameRepository.GetAsync(rq.);

        // if (game is null)
        // {
        //     return BadRequest("Game Not found");
        // }

        await _GPRepository.AddGameToUser(rq.userId,rq.gameids);

        return Ok();
    }



}