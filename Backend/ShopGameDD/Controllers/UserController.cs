
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopGameDD.Models;
using ShopGameDD.Repositories.cart;
using ShopGameDD.Repositories.developerandpublisher;
using ShopGameDD.Repositories.game;
using ShopGameDD.Repositories.game_purchased;
using ShopGameDD.Repositories.jwt;
using ShopGameDD.Repositories.order;
using ShopGameDD.Repositories.user;
using ShopGameDD.Requests.gp;
using ShopGameDD.Requests.user;
using ShopGameDD.Response;

namespace ShopGameDD.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]/[action]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _UserRepository;
    private readonly IDAPRepository _DAPRepository;
    private readonly IGPRepository _IGPRepositoryy;
    private readonly IOrderRepository _OrderRepository;
    private readonly ICartRepository _CartRepository;
    private readonly IGameRepository _IGameRepository;
    private readonly IjwtRepository _jwtService;

    public UserController(
        ICartRepository cartRepository,
        IOrderRepository orderRepository,
        IGPRepository gPRepository,
        IUserRepository userRepository,
        IjwtRepository jwtRepository,
        IDAPRepository dAPRepository,
        IGameRepository gameRepository
    )
    {
        _UserRepository = userRepository;
        _DAPRepository = dAPRepository;
        _jwtService = jwtRepository;
        _IGPRepositoryy = gPRepository;
        _OrderRepository = orderRepository;
        _CartRepository = cartRepository;
        _IGameRepository = gameRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        IEnumerable<User> users = await _UserRepository.GetsAsync();

        return Ok(users);
    }
    [HttpGet]
    public async Task<IActionResult> GetUsersAndStats()
    {
        IEnumerable<User> users = await _UserRepository.getAllUser();

        var UsersCount = await _UserRepository.getUserCount();
        var DAPCount = await _UserRepository.getDAPCount();
        var AdminCount = await _UserRepository.getAdminCount();
        var GamesCount = await _IGameRepository.GetCountGames();

        foreach (var user in users)
        {
            if (user.UserRole == UserRole.DEVELOPER)
            {
                if (user.Isleader == true)
                {
                    user.UserRole = UserRole.LEADER;
                }
                else
                {
                    user.UserRole = UserRole.MEMBER;
                }
            }
        }

        return Ok(new
        {
            users,
            UsersCount,
            DAPCount,
            AdminCount,
            GamesCount
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(string id)
    {
        User user = await _UserRepository.GetAsync(id);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }

        return Ok(user);
    }

    [HttpGet("{userid}")]
    public async Task<IActionResult> GetGamesGpByUserId(string userid)
    {
        User user = await _UserRepository.GetAsync(userid);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }

        IEnumerable<Game> games = await _IGPRepositoryy.GetGamesGpByUserId(userid);

        return Ok(games);
    }


    [HttpPost]
    [ActionName("create")]
    public async Task<IActionResult> CreateUser(CreateUserRq rq)
    {
        if (await _UserRepository.CheckGmail(rq.Gmail))
        {
            return BadRequest("Already have acount");
        }

        User NewUser = new User
        {
            Name = rq.Name,
            Gmail = rq.Gmail,
            Password = rq.Password,
            Wallet = 0,
            UserRole = rq.Role,
            IsInTeam = false
        };

        await _UserRepository.CreateUserAsync(NewUser);

        return NoContent();
    }

    [HttpPost]
    [ActionName("login")]
    public async Task<IActionResult> Login(LoginUserRq rq)
    {

        User user = await _UserRepository.Login(rq.Gmail, rq.Password);

        if (user is null)
        {
            var ErrResponse = new ApiResponse<User>
            {
                Data = null,
                Message = "Dont Have this account"
            };

            return BadRequest(ErrResponse);

        }
        else
        {
            if (!user.isBlock)
            {

                var token = _jwtService.GenerateJwtToken(user);

                var data = new
                {
                    token,
                    account = user,
                };

                return Ok(new { data, message = "Login Success" });
            }
            else
            {
                var ErrResponse = new ApiResponse<User>
                {
                    Data = null,
                    Message = "This account is block"
                };

                return BadRequest(ErrResponse);
            }
        }
    }

    [HttpPost]
    public async Task<IActionResult> PurchasedGames(PurchasedGamesRq rq)
    {
        User user = await _UserRepository.GetAsync(rq.userId);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }

        await _IGPRepositoryy.AddGameToUser(rq.userId, rq.gameids);

        Order order = new Order
        {
            UserId = rq.userId,
            Gameids = rq.gameids,
            DatePurchased = rq.DatePurchased,
            TotalMoney = rq.TotalMoney,
        };

        user.Wallet -= rq.TotalMoney;
        await _UserRepository.UpdateAsync(user.Id,user);
        await _OrderRepository.CreateOrder(order);
        await _CartRepository.removeUserCart(rq.userId);
        return Ok();
    }

    [HttpPut("{userid}")]
    public async Task<IActionResult> AssignAdminTiUser(string userid)
    {
        User user = await _UserRepository.GetAsync(userid);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }

        await _UserRepository.setToAdmin(userid);
        await _UserRepository.setUserIsInTeam(userid, false);

        return Ok("Set admin success");
    }

    [HttpPut("{userid}")]
    public async Task<IActionResult> AssigniDevToUser(string userid)
    {
        User user = await _UserRepository.GetAsync(userid);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }

        await _UserRepository.setToDev(userid);
        if (!String.IsNullOrEmpty(user.TeamId))
        {
            await _UserRepository.setUserIsInTeam(userid, true);
        }
        else
        {
            await _UserRepository.setUserIsInTeam(userid, false);
        }

        return Ok("Set dev success");
    }

    [HttpPut("{userid}")]
    public async Task<IActionResult> setBlockUser(string userid)
    {
        User user = await _UserRepository.GetAsync(userid);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }
        user.isBlock = true;
        await _UserRepository.UpdateAsync(userid, user);
        return Ok("Set dev success");
    }

    [HttpPut("{userid}")]
    public async Task<IActionResult> setUnBlockUser(string userid)
    {
        User user = await _UserRepository.GetAsync(userid);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }
        user.isBlock = false;
        await _UserRepository.UpdateAsync(userid, user);
        return Ok("Set dev success");
    }

    [HttpPut("{userid}")]
    public async Task<IActionResult> AssigniUserToUser(string userid)
    {
        User user = await _UserRepository.GetAsync(userid);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }

        await _UserRepository.setToUser(userid);
        await _UserRepository.setUserIsInTeam(userid, false);


        return Ok("Set dev success");
    }

    [HttpPut]
    public async Task<IActionResult> UpdateUser(UpdateUserRq rq)
    {
        User user = await _UserRepository.GetAsync(rq.Id);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }

        user.Name = rq.Name;
        user.Gmail = rq.Gmail;
        user.Password = rq.Password;

        await _UserRepository.UpdateAsync(rq.Id, user);

        return NoContent();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAvatar(Avatar avatar)
    {
        User user = await _UserRepository.GetAsync(avatar.userid);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }

        await _UserRepository.setAvatar(avatar.imgurl, avatar.userid);

        return NoContent();
    }

    [HttpPut]
    public async Task<IActionResult> RemoveRequsetToteam(UserAndTeamIdrRq rq)
    {
        User user = await _UserRepository.GetAsync(rq.UserId);
        DeveloperAndPublisher dap = await _DAPRepository.GetAsync(rq.TeamId);

        if (user is null)
        {
            if (dap is null)
            {
                return BadRequest("Team Not Found");
            }
            return BadRequest("User Not Found");
        }

        await _UserRepository.RemoveMyRequestToteam(rq.UserId, dap);
        await _DAPRepository.RemoveUserRequestId(rq.TeamId, rq.UserId);

        return Ok(new
        {
            message = "Remove sucess"
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser([FromRoute] string id)
    {
        User user = await _UserRepository.GetAsync(id);

        if (user is null)
        {
            return BadRequest("User Not Found");
        }

        await _UserRepository.RemoveAsync(id);

        return NoContent();
    }
}