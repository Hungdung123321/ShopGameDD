using ShopGameDD.Models;

namespace ShopGameDD.Repositories.user;

public interface IUserRepository : IBaseRepository<User>
{
    Task CreateUserAsync(User user);
    Task RemoveMyRequestToteam(string userid,DeveloperAndPublisher teamid);
    Task<bool> CheckGmail(string Gmail);

    Task<User> Login(string Gmail,string password);
    Task<IEnumerable<User>> getAllUser();
    Task setUserTeamId(string userid,string teamid);
    Task setUserIsLeader(string userid,bool value);
    Task setUserIsInTeam(string userid,bool value);
    Task setUserRole(string userid,UserRole value);
    Task<long> getUserCount();
    Task<long> getDAPCount();
    Task<long> getAdminCount();
    Task setToAdmin(string userid);
    Task setToDev(string userid);
    Task setToUser(string userid);
    Task setAvatar(string imgurl,string userid);

}