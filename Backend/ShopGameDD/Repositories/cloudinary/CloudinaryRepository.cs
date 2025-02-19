


using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using ShopGameDD.Repositories.cloudinary;

public class CloudinaryRepository : ICloudinaryRepository
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryRepository(IConfiguration configuration)
    {
        _cloudinary = new Cloudinary("cloudinary://429689121256599:0t2aV3pgw12zDCqaefVd3k_WINI@dw32kbavt");
    }

    public async Task<string?> UploadImageAsync(IFormFile file)
    {
        using var stream = new MemoryStream();
        file.CopyTo(stream);
        stream.Seek(0, SeekOrigin.Begin);

        var uploadParams = new ImageUploadParams()
        {
            File = new FileDescription(file.FileName, stream),
            Folder = "ShopGamedd",  // Specify the folder here // Optional: Custom file name (PublicId)
        };

        var uploadResult = _cloudinary.Upload(uploadParams);

        if (uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
        {
            return uploadResult.SecureUrl.ToString();  // Return the image URL
        }

        return null;
    }

    public async Task<List<string?>> UploadImagesAsync(IEnumerable<IFormFile> files, string nameFolder)
    {
        var imageUrls = new List<string?>();

        foreach (var file in files)
        {
            using var stream = new MemoryStream();
            file.CopyTo(stream);
            stream.Seek(0, SeekOrigin.Begin);

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, stream),
                Folder = "ShopGamedd/" + nameFolder,  // Specify the folder here // Optional: Custom file name (PublicId)
            };

            var uploadResult = _cloudinary.Upload(uploadParams);

            if (uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
            {
                imageUrls.Add(uploadResult.SecureUrl.ToString());
            }
            else
            {
                imageUrls.Add(null);
            }
        }
        return imageUrls;
    }

    public async Task<List<string>> GetImagesInFolderAsync(string folderName)
    {
        var publicIds = new List<string>();
        var resources = await _cloudinary.ListResourceByAssetFolderAsync("ShopGamedd/" + folderName, false, false, false);
        publicIds = resources.Resources.Select(r => r.SecureUrl.ToString()).ToList();
        return publicIds;
    }

    public async Task<List<string>> GetPublicIdsInFolderAsync(string folderName)
    {
        var publicIds = new List<string>();
        var resources = await _cloudinary.ListResourceByAssetFolderAsync("ShopGamedd/" + folderName, false, false, false);
        publicIds = resources.Resources.Select(r => r.PublicId).ToList();
        return publicIds;
    }

    public async Task<List<string>> DeleteImagesInFolderAsync(string folderName)
    {
        var publicIds = await GetPublicIdsInFolderAsync(folderName);
        var deletedAssetIds = new List<string>();

        var deletionResult = await _cloudinary.DeleteResourcesAsync(new DelResParams
        {
            PublicIds = publicIds,
        });

        foreach (var publicId in publicIds)
        {
            if (deletionResult.Deleted.ContainsKey(publicId) &&
                deletionResult.Deleted[publicId] == "deleted")
            {
                deletedAssetIds.Add(publicId);
                Console.WriteLine($"Deleted asset: {publicId}");
            }
            else
            {
                Console.WriteLine($"Failed to delete asset: {publicId}");
            }
        }
        await _cloudinary.DeleteFolderAsync("ShopGamedd/"+folderName);
        
        return deletedAssetIds;
    }
}