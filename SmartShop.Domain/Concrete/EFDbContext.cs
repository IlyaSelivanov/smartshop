using Microsoft.EntityFrameworkCore;
using SmartShop.Domain.Entities;

namespace SmartShop.Domain.Concrete {
    public class EFDbContext : DbContext {
        public DbSet<Product> Products { get; set; }

        public EFDbContext(DbContextOptions<EFDbContext> options) : base(options) {
            Database.EnsureCreated();
        }
    }
}
