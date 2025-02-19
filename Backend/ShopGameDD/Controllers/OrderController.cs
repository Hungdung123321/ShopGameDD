using Microsoft.AspNetCore.Mvc;
using ShopGameDD.Models;
using ShopGameDD.Repositories.game;
using ShopGameDD.Repositories.genre;
using ShopGameDD.Repositories.order;
using ShopGameDD.Repositories.user;
using ShopGameDD.Requests.genre;
using ShopGameDD.Requests.order;

namespace ShopGameDD.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class OrderController : ControllerBase
{
    private readonly IOrderRepository _OrderRepository;
    private readonly IUserRepository _UserRepository;
    private readonly IGameRepository _GameRepository;
    public OrderController(IGameRepository gameRepository,IOrderRepository orderRepository, IUserRepository userRepository)
    {
        _OrderRepository = orderRepository;
        _UserRepository = userRepository;
        _GameRepository = gameRepository;
    }

    [HttpGet("{userid}")]
    public async Task<IActionResult> GetUseOrders(string userid)
    {
        User user = await _UserRepository.GetAsync(userid);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }
        IEnumerable<Order> orders = await _OrderRepository.GetUserOrders(userid);
        return Ok(orders);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder(OrderRq rq)
    {
        User user = await _UserRepository.GetAsync(rq.UserId);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }

        Order OrderRq = new Order
        {
            UserId = rq.UserId,
            Gameids = rq.Gameids,
            TotalMoney = rq.TotalMoney,
            DatePurchased = rq.DatePurchased,
        };

        await _OrderRepository.CreateAsync(OrderRq);
        return Ok();
    }

}