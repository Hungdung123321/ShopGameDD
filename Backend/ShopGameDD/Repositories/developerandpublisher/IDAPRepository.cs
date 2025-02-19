using ShopGameDD.Models;

namespace ShopGameDD.Repositories.developerandpublisher;

public interface IDAPRepository : IBaseRepository<DeveloperAndPublisher>
{
    Task AddUserRequestId(string id,string userId); 
    Task AddUserToTeam(string teamid,string userId); 
    Task CancelUserToTeam(string teamid,string userId); 
    Task RemoveUserRequestId(string id,string userId); 
    Task<bool> CheckUserRequestExist(string id,string userId);
    Task<bool> CheckMemberExist(string id,string userId);
    Task<DeveloperAndPublisher> getImageAndName(string teamid);
    Task<IEnumerable<DeveloperAndPublisher>> SearchTeamsAsync(string searchTerm);
    Task<IEnumerable<User>> GetAllMemberByTeamId(string teamid);
    Task<IEnumerable<User>> GetUsersRequestByTeamId(string teamid);
}