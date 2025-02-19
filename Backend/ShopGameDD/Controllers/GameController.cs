using Microsoft.AspNetCore.Mvc;
using ShopGameDD.Models;
using ShopGameDD.Repositories.cart;
using ShopGameDD.Repositories.cloudinary;
using ShopGameDD.Repositories.developerandpublisher;
using ShopGameDD.Repositories.game;
using ShopGameDD.Repositories.game_purchased;
using ShopGameDD.Requests.game;
using ShopGameDD.Requests.order;

namespace ShopGameDD.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class GameController : ControllerBase
{
    private readonly IGameRepository _GameRepository;
    private readonly IDAPRepository _DAPRepository;
    private readonly ICloudinaryRepository _CloudinaryRepository;
    private readonly ICartRepository _CartRepository;
    private readonly IGPRepository _GPRepository;
    public GameController(IGPRepository gPRepository, IGameRepository gameRepository, IDAPRepository dAPRepository, ICloudinaryRepository cloudinary, ICartRepository cartRepository)
    {
        _GameRepository = gameRepository;
        _DAPRepository = dAPRepository;
        _CloudinaryRepository = cloudinary;
        _CartRepository = cartRepository;
        _GPRepository = gPRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetGames()
    {
        IEnumerable<Game> games = await _GameRepository.GetGames();

        foreach (Game item in games)
        {
            item.Description = null;
            item.About = null;
            item.SystemRequirement = null;
        }

        return Ok(games.Reverse());
    }

    [HttpGet]
    public async Task<IActionResult> GetGamesByFilter([FromQuery] GameFilter filters)
    {
        IEnumerable<Game> games = await _GameRepository.GetFilteredGames(filters);
        foreach (Game item in games)
        {
            item.Description = null;
            item.About = null;
            item.SystemRequirement = null;
        }
        return Ok(games);
    }

    [HttpGet("{teamid}")]
    public async Task<IActionResult> GetTeamGames(string teamid)
    {
        DeveloperAndPublisher dap = await _DAPRepository.GetAsync(teamid);

        if (dap is null)
        {
            return BadRequest("Team not found");
        }

        IEnumerable<Game> games = await _GameRepository.GetTeamGames(teamid);

        return Ok(games.Reverse());
    }

    [HttpGet("{teamid}")]
    public async Task<IActionResult> GetTeamGamesv2(string teamid)
    {
        DeveloperAndPublisher dap = await _DAPRepository.GetAsync(teamid);

        if (dap is null)
        {
            return BadRequest("Team not found");
        }

        IEnumerable<Game> games = await _GameRepository.GetTeamGamesV2(teamid);

        return Ok(games.Reverse());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetGame(string id)
    {
        Game game = await _GameRepository.GetAsync(id);

        if (game is null)
        {
            return BadRequest("game Not Found");
        }

        return Ok(game);
    }

    [HttpPost]
    public async Task<IActionResult> GetGamesByListGameid(Getgamesrq rq)
    {
        IEnumerable<Game> games = await _GameRepository.GetGames(rq.Gameids);

        return Ok(games);
    }

    [HttpGet("{id}/{userid}")]
    public async Task<IActionResult> GetGame(string id, string userid)
    {
        Game game = await _GameRepository.GetAsync(id);

        if (game is null)
        {
            return BadRequest("game Not Found");
        }

        Cart cart = await _CartRepository.GetCartByGameUser(id, userid);
        
        if (cart is null)
        {
            bool isPurchased = await _GPRepository.checkGameUserPurchased(userid, id);
            if (isPurchased)
            {
                return Ok(new { game, GameState = 2 });
            }
           return Ok(new { game, GameState = 0 });
        }
        else if (cart is not null)
        {
            return Ok(new { game, GameState = 1 });

        }

        return Ok(game);
    }

    [HttpPost]
    public async Task<IActionResult> CreateGame(CreateGamepRq rq)
    {

        DeveloperAndPublisher dap = await _DAPRepository.GetAsync(rq.Developer);

        if (dap is null)
        {
            return BadRequest("Developer not found");
        }

        Game game = new Game
        {
            Name = rq.Name,
            DeveloperId = rq.Developer,
            Serie = rq.Serie,
            version = rq.version,
            Features = rq.Features,
            Genres = rq.Genres,
            About = rq.About,
            Description = rq.Description,
            SystemRequirement = rq.SystemRequirement,
            ReleasedDate = rq.ReleasedDate,
            Price = rq.Price,
            ImageUrl = rq.ImageUrl,
            MoreImageUrls = rq.ImageUrls
        };

        await _GameRepository.CreateAsync(game);

        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateGame(Game gamerq)
    {

        Game game = await _GameRepository.GetAsync(gamerq.Id);

        if (game is null)
        {
            return BadRequest("game Not Found");
        }

        game = gamerq;

        await _GameRepository.UpdateAsync(game.Id, game);

        return Ok("Update Success");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGame([FromRoute] string id)
    {
        Game game = await _GameRepository.GetAsync(id);

        if (game is null)
        {
            return BadRequest("game Not Found");
        }

        var deletedImagePublicIds = await _CloudinaryRepository.DeleteImagesInFolderAsync(game.Name);
        await _GameRepository.RemoveAsync(id);
        return Ok(new
        {
            img = deletedImagePublicIds,
        });
    }
}