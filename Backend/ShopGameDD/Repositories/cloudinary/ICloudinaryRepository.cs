namespace ShopGameDD.Repositories.cloudinary;


public interface ICloudinaryRepository
{   
    Task<List<string>> GetImagesInFolderAsync(string folderName);

    Task<string?> UploadImageAsync(IFormFile file);

    Task<List<string?>> UploadImagesAsync(IEnumerable<IFormFile> files, string nameFolder);

    Task<List<string>> DeleteImagesInFolderAsync(string folderName);

}