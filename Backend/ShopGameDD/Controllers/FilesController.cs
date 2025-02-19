using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using ShopGameDD.Context;
using ShopGameDD.Repositories.cloudinary;
using ShopGameDD.Requests.file;

namespace ShopGameDD.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class FilesController : ControllerBase
{
    private readonly IMongoDbContext _context;
    private readonly ICloudinaryRepository _cloudinary;
    public FilesController(IMongoDbContext context, ICloudinaryRepository cloudinary)
    {
        _context = context;
        _cloudinary = cloudinary;
    }

    [HttpGet("Getfolder/{foldername}")]
    public async Task<IActionResult> GetFolder(string foldername)
    {
        var imagesUrl = await _cloudinary.GetImagesInFolderAsync(foldername);

        return Ok(imagesUrl);
    }

    // Upload a file
    [HttpPost("upload")]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        var imageUrl = await _cloudinary.UploadImageAsync(file);

        if (imageUrl is null)
        {
            return BadRequest(new
            {
                Message = "Upload Falid",
            });
        }

        return Ok(new
        {
            imageUrl,
            Message = "Upload Success",
        });
    }

    
    [HttpPost("upload-more")]
    public async Task<IActionResult> UploadMutipleFile(UploadMoreRq rq)
    {
        var imagesUrl = await _cloudinary.UploadImagesAsync(rq.Files,rq.Namefolder);

        if (imagesUrl is null)
        {
            return BadRequest(new
            {
                Message = "Upload Falid",
            });
        }

        return Ok(new
        {
            imagesUrl,
            Message = "Upload Success",
        });
    }

    [HttpDelete("delete-folder/{foldername}")]
    public async Task<IActionResult> DeleteImage(string foldername)
    {
        var deletedImagePublicIds = await _cloudinary.DeleteImagesInFolderAsync(foldername);

        return Ok(deletedImagePublicIds);
    }

}