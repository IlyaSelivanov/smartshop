using SmartShop.Domain.Entities;
using System.Collections.Generic;

namespace SmartShop.Domain.Abstract {
    public interface IDomainRepository {
        IEnumerable<Product> Products { get; }
        IEnumerable<Category> Categories { get; }
        IEnumerable<Shop> Shops { get; }
    }
}
