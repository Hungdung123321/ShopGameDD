using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Util.Store;

public class GgdriveRepo
{
    private static readonly string[] Scopes = { DriveService.Scope.DriveFile };
    private static string ApplicationName = "YourAppName";
    private DriveService driveService;

    public async Task InitializeDriveServiceAsync()
    {
        UserCredential credential;

        // Load credentials from a file (this file is obtained from the Google Developer Console).
        using (var stream = new FileStream("credentials.json", FileMode.Open, FileAccess.Read))
        {
            // The file token.json stores the user's access and refresh tokens.
            var token = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                GoogleClientSecrets.Load(stream).Secrets,
                Scopes,
                "user",
                CancellationToken.None,
                new FileDataStore("Drive.Api.Auth.Store", true)
            );
            credential = token;
        }

        // Create the Drive API service.
        driveService = new DriveService(new BaseClientService.Initializer()
        {
            HttpClientInitializer = credential,
            ApplicationName = ApplicationName,
        });
    }

    public async Task UploadFileToDriveAsync(string filePath, string mimeType)
    {
        // Create the file metadata.
        var fileMetadata = new Google.Apis.Drive.v3.Data.File()
        {
            Name = Path.GetFileName(filePath)
        };

        // Create the file stream.
        FilesResource.CreateMediaUpload request;
        using (var stream = new FileStream(filePath, FileMode.Open))
        {
            request = driveService.Files.Create(fileMetadata, stream, mimeType);
            request.Fields = "id";
            await request.UploadAsync();
        }

        var file = request.ResponseBody;
        Console.WriteLine($"File ID: {file.Id}");
    }
}
