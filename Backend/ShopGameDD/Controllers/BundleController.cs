using Microsoft.AspNetCore.Mvc;
using ShopGameDD.Models;
using ShopGameDD.Repositories.bundle;
using ShopGameDD.Requests.bundle;

namespace ShopGameDD.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class BundleController : ControllerBase
{
    private readonly IBundleRepository _BundleRepository;
    public BundleController(IBundleRepository bundleRepository)
    {
        _BundleRepository = bundleRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetCarts()
    {   
        IEnumerable<Bundle> bundles = await _BundleRepository.GetsAsync();
        
        return Ok(bundles);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCart(string id)
    {   
        Bundle bundle = await _BundleRepository.GetAsync(id);
        
        if (bundle is null)
        {
            return BadRequest("bundle Not Found");
        }

        return Ok(bundle);
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(CreateBundleRq rq)
    {   

        List<GameVersion> versions = [
            GameVersion.Standard,
            GameVersion.DLC,
            GameVersion.SoundTrack,
        ];
        
        Bundle bundle = new Bundle()
        {
            Name = rq.Name,
            ItemVersions = versions.ConvertAll(f => f.ToString())
        };

        await _BundleRepository.CreateAsync(bundle);

        return NoContent();
    }
}