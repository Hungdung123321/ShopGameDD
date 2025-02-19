using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopGameDD.Models;
using ShopGameDD.Repositories.cart;
using ShopGameDD.Repositories.game;
using ShopGameDD.Repositories.user;

namespace ShopGameDD.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class CartController : ControllerBase
{
    private readonly ICartRepository _CartRepository;
    private readonly IGameRepository _GameRepository;
    private readonly IUserRepository _UserRepository;
    public CartController(ICartRepository cartRepository,IGameRepository gameRepository,IUserRepository userRepository)
    {
        _CartRepository = cartRepository;
        _GameRepository = gameRepository;
        _UserRepository = userRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetCarts()
    {
        IEnumerable<Cart> carts = await _CartRepository.GetsAsync();

        return Ok(carts);
    }

    [HttpGet("{userid}")]
    public async Task<IActionResult> GetGamesInCartByUserid(string userid)
    {
        IEnumerable<Game> games = await _CartRepository.GetGamesUserId(userid);
        foreach (Game item in games)
        {
            item.Description = null;
            item.About = null;
            item.SystemRequirement = null;
        }
        return Ok(games);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCart(string id)
    {
        Cart cart = await _CartRepository.GetAsync(id);

        if (cart is null)
        {
            return BadRequest("cart Not Found");
        }

        return Ok(cart);
    }

    [HttpPost("{userid}/{gameid}")]
    public async Task<IActionResult> AddUserGameCart(string userid, string gameid)
    {
        User user = await _UserRepository.GetAsync(userid);

        if (user is null)
        {
            return BadRequest("User Not found");
        }

        Game game = await _GameRepository.GetAsync(gameid);
        
        if (game is null)
        {
            return BadRequest("Game Not found");
        }

        Cart Cart = new Cart
        {
            UserId = userid,
            GameId = gameid
        };

        await _CartRepository.CreateAsync(Cart);

        return Ok();
    }

    [HttpDelete("{userid}/{gameid}")]
    public async Task<IActionResult> RemoveUserGameCart(string userid, string gameid)
    {
        User user = await _UserRepository.GetAsync(userid);

        if (user is null)
        {
            return BadRequest("User Not found");
        }

        Game game = await _GameRepository.GetAsync(gameid);
        
        if (game is null)
        {
            return BadRequest("Game Not found");
        }

        Cart cart = await _CartRepository.GetCartByGameUser(gameid, userid);

        await _CartRepository.RemoveAsync(cart.Id);

        return Ok("remove success");
    }
}