using ShopGameDD.Models;

namespace ShopGameDD.Repositories;

public interface IBaseRepository<TModel> where TModel : class,IModels
{
    Task<TModel> GetAsync(string id);
    Task<IEnumerable<TModel>> GetsAsync();
    Task CreateAsync(TModel obj); 
    Task UpdateAsync(string id,TModel obj); 
    Task RemoveAsync(string id); 
}
