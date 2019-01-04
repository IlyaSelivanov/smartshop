using SmartShop.Domain.Abstract;
using SmartShop.Domain.Entities;
using System.Collections.Generic;

namespace SmartShop.Domain.Concrete {
    public class EFDomainRepository : IDomainRepository {
        EFDbContext _context;

        public IEnumerable<Product> Products {
            get { return _context.Products; }
        }

        public EFDomainRepository(EFDbContext context) {
            _context = context;
        }
    }
}
