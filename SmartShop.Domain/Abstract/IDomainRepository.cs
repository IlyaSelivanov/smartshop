using SmartShop.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartShop.Domain.Abstract
{
    public interface IDomainRepository
    {
        IEnumerable<Product> Products { get; }
        IEnumerable<Category> Categories { get; }
        IEnumerable<Shop> Shops { get; }

        Task CreateShopAsync(Shop shop);
        Task UpdateShopAsync(int id, Shop shop);
        Task<bool> DeleteShopAsync(int id);

        void CreateShop(Shop shop);
        void UpdateShop(int id, Shop shop);
        bool DeleteShop(int id);
    }
}
