using Microsoft.AspNetCore.Mvc;
using ShopGameDD.Models;
using ShopGameDD.Repositories.genre;
using ShopGameDD.Requests.genre;

namespace ShopGameDD.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class GenreController : ControllerBase
{
    private readonly IGenreRepository _GenreRepository;
    public GenreController(IGenreRepository genreRepository)
    {
        _GenreRepository = genreRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetGenres()
    {   
        IEnumerable<Genre> genres = await _GenreRepository.GetsAsync();
        
        return Ok(genres);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetGenre(string id)
    {   
        Genre genre = await _GenreRepository.GetAsync(id);
        
        if (genre is null)
        {
            return BadRequest("genre Not Found");
        }

        return Ok(genre);
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser(CreateGenreRq rq)
    {   
        Genre genreRq = new Genre
        {
            Name = rq.Name
        };

        await _GenreRepository.CreateAsync(genreRq);

        return NoContent();
    }

    [HttpPut]
    public async Task<IActionResult> UpdateUser(UpdateGenreRq rq)
    {
        Genre genre = await _GenreRepository.GetAsync(rq.Id);

        if (genre is null)
        {
            return BadRequest("Genre Not Found");
        }

        genre.Name = rq.Name;

        await _GenreRepository.UpdateAsync(rq.Id,genre);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser([FromRoute] string id)
    {
        Genre genre = await _GenreRepository.GetAsync(id);

        if (genre is null)
        {
            return BadRequest("Genre Not Found");
        }

        await _GenreRepository.RemoveAsync(id);

        return NoContent();
    }
}