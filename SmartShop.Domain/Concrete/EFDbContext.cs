using Microsoft.EntityFrameworkCore;
using SmartShop.Domain.Entities;

namespace SmartShop.Domain.Concrete {
    public class EFDbContext : DbContext {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Shop> Shops { get; set; }

        public EFDbContext(DbContextOptions<EFDbContext> options) : base(options) {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId);

            modelBuilder.Entity<ShopProduct>()
                .HasKey(s => new { s.ShopId, s.ProductId });

            modelBuilder.Entity<ShopProduct>()
                .HasOne(sp => sp.Shop)
                .WithMany(s => s.ShopProducts)
                .HasForeignKey(sp => sp.ShopId);

            modelBuilder.Entity<ShopProduct>()
                .HasOne(sp => sp.Product)
                .WithMany(p => p.ShopProducts)
                .HasForeignKey(sp => sp.ProductId);

            modelBuilder.Entity<Shop>().OwnsOne(s => s.Location);

            modelBuilder.Entity<Category>().HasData(
                new Category[]
                {
                    new Category {Id = 1, Name = "Продукты"},
                    new Category {Id = 2, Name = "Медикаменты"}
                });

            modelBuilder.Entity<Product>().HasData(
                new Product[]
                {
                    new Product{Id = 1, Name = "Хлеб", CategoryId = 1},
                    new Product{Id = 2, Name = "Молоко", CategoryId = 1},
                    new Product{Id = 3, Name = "Fruits"}
                });

            base.OnModelCreating(modelBuilder);
        }
    }
}
