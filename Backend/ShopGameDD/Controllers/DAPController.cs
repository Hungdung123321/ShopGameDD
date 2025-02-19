using Microsoft.AspNetCore.Mvc;
using ShopGameDD.Models;
using ShopGameDD.Repositories.developerandpublisher;
using ShopGameDD.Repositories.user;
using ShopGameDD.Requests.dap;

namespace ShopGameDD.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class DAPController : ControllerBase
{
    private readonly IDAPRepository _DAPRepository;
    private readonly IUserRepository _UserRepository;
    public DAPController(IDAPRepository dapRepository, IUserRepository userRepository)
    {
        _DAPRepository = dapRepository;
        _UserRepository = userRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetDAPs()
    {
        IEnumerable<DeveloperAndPublisher> daps = await _DAPRepository.GetsAsync();

        return Ok(daps);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string? name)
    {
        if (string.IsNullOrEmpty(name))
        {
            var alldap = await _DAPRepository.GetsAsync();
            return Ok(alldap);
        }
        var dap = await _DAPRepository.SearchTeamsAsync(name);
        return Ok(dap);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDAP(string id)
    {
        DeveloperAndPublisher dap = await _DAPRepository.GetAsync(id);

        if (dap is null)
        {
            return BadRequest("dap Not Found");
        }

        return Ok(dap);
    }

    [HttpGet("{teamid}")]
    public async Task<IActionResult> GetDAPImgAndName(string teamid)
    {
        DeveloperAndPublisher dap = await _DAPRepository.getImageAndName(teamid);

        if (dap is null)
        {
            return BadRequest("dap Not Found");
        }

        return Ok(dap);
    }

    [HttpGet("{teamid}")]
    public async Task<IActionResult> GetMembers(string teamid)
    {
        DeveloperAndPublisher dap = await _DAPRepository.GetAsync(teamid);

        if (dap is null)
        {
            return BadRequest("Team Not Found");
        }

        IEnumerable<User> users = await _DAPRepository.GetAllMemberByTeamId(teamid);


        return Ok(users);
    }

    [HttpGet("{teamid}")]
    public async Task<IActionResult> GetUserRequests(string teamid)
    {
        DeveloperAndPublisher dap = await _DAPRepository.GetAsync(teamid);

        if (dap is null)
        {
            return BadRequest("Team Not Found");
        }

        IEnumerable<User> users = await _DAPRepository.GetUsersRequestByTeamId(teamid);


        return Ok(users);
    }

    [HttpGet("CheckUserRequestToTeam/{userid}/{dapid}")]
    public async Task<IActionResult> CheckUserRequestToTeam(string userid, string dapid)
    {
        User user = await _UserRepository.GetAsync(userid);
        DeveloperAndPublisher dap = await _DAPRepository.GetAsync(dapid);
        if (user is null)
        {
            return BadRequest("User not found.");
        }

        var exists1 = await _DAPRepository.CheckMemberExist(dap.Id, user.Id);
        if (exists1)
        {
            return Ok(new { UserRqState = 0, message = "In Team" });
        }

        var exists2 = await _DAPRepository.CheckUserRequestExist(dap.Id, user.Id);
        if (exists2)
        {
            return Ok(new { UserRqState = 1, message = "...Wating" });
        }
        else
        {
            return Ok(new { UserRqState = 2, message = "Apply to team" });
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateDap(CreateDapRq rq)
    {
        User user = await _UserRepository.GetAsync(rq.LeaderId);
        if (user is null)
        {
            return BadRequest("user not found");
        }

        DeveloperAndPublisher dap = new DeveloperAndPublisher
        {
            Name = rq.Name,
            Website = rq.Website,
            Country = rq.Country,
            Taxid = rq.Taxid,
            logoUrl = rq.logoUrl,
            AboutContent = rq.AboutContent,
            LeaderId = rq.LeaderId,
            UsersId = [rq.LeaderId]
        };

        await _DAPRepository.CreateAsync(dap);
        await _UserRepository.setUserTeamId(rq.LeaderId, dap.Id);
        await _UserRepository.setUserIsLeader(rq.LeaderId, true);
        await _UserRepository.setUserIsInTeam(rq.LeaderId, true);
        await _UserRepository.setUserRole(rq.LeaderId, UserRole.DEVELOPER);
        return NoContent();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateUser(UpdateDapRq rq)
    {
        DeveloperAndPublisher dap = await _DAPRepository.GetAsync(rq.Id);

        if (dap is null)
        {
            return BadRequest("User Not Found");
        }

        dap.Name = rq.Name;
        dap.Website = rq.Website;
        dap.Country = rq.Country;

        await _DAPRepository.UpdateAsync(rq.Id, dap);

        return NoContent();
    }

    [HttpPut]
    public async Task<IActionResult> AddUserRequest(RequestUserRq rq)
    {
        User user = await _UserRepository.GetAsync(rq.UserId);
        DeveloperAndPublisher dap = await _DAPRepository.GetAsync(rq.Dapid);

        if (user is null)
        {
            if (dap is null)
            {
                return BadRequest(new
                {
                    message = "Team Not Found",
                });
            }
            return BadRequest(new
            {
                message = "User Not Found",
            });
        }

        await _DAPRepository.AddUserRequestId(dap.Id, user.Id);

        return Ok(new
        {
            message = "Add Success",
        });
    }

    [HttpPut("{teamid}/{userId}")]
    public async Task<IActionResult> AddUserToTeam(string teamid, string userId)
    {
        User user = await _UserRepository.GetAsync(userId);
        DeveloperAndPublisher dap = await _DAPRepository.GetAsync(teamid);

        if (user is null)
        {
            if (dap is null)
            {
                return BadRequest("Team Not Found");
            }
            return BadRequest("User Not Found");
        }

        if (user.IsInTeam == true)
        {
            return Ok(new { message = "User Already in Team" });
        }

        await _DAPRepository.AddUserToTeam(dap.Id, user.Id);
        await _DAPRepository.RemoveUserRequestId(dap.Id, user.Id);
        await _UserRepository.RemoveMyRequestToteam(user.Id, dap);
        await _UserRepository.setUserIsInTeam(user.Id, true);
        await _UserRepository.setUserTeamId(user.Id, dap.Id);
        await _UserRepository.setUserRole(user.Id, UserRole.DEVELOPER);

        return Ok(new
        {
            message = "Added user to team",
        });
    }

    [HttpPut("{teamid}/{userId}")]
    public async Task<IActionResult> RemoveUserToTeam(string teamid, string userId)
    {
        User user = await _UserRepository.GetAsync(userId);
        DeveloperAndPublisher dap = await _DAPRepository.GetAsync(teamid);

        if (user is null)
        {
            if (dap is null)
            {
                return BadRequest("Team Not Found");
            }
            return BadRequest("User Not Found");
        }

        await _DAPRepository.RemoveUserRequestId(dap.Id, user.Id);
        await _UserRepository.RemoveMyRequestToteam(user.Id, dap);
        await _UserRepository.setUserIsInTeam(user.Id, false);
        await _UserRepository.setUserTeamId(user.Id, "");

        return Ok(new
        {
            message = "Removed user to team",
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser([FromRoute] string id)
    {
        DeveloperAndPublisher dap = await _DAPRepository.GetAsync(id);

        if (dap is null)
        {
            return BadRequest("User Not Found");
        }

        await _DAPRepository.RemoveAsync(id);

        return NoContent();
    }
}