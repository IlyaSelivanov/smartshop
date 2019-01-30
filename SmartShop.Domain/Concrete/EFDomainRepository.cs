using SmartShop.Domain.Abstract;
using SmartShop.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartShop.Domain.Concrete {
    public class EFDomainRepository : IDomainRepository {
        EFDbContext _context;

        public IEnumerable<Product> Products {
            get { return _context.Products; }
        }

        public IEnumerable<Category> Categories {
            get { return _context.Categories; }
        }

        public IEnumerable<Shop> Shops {
            get { return _context.Shops; }
        }

        public EFDomainRepository(EFDbContext context) {
            _context = context;
        }

        public async Task CreateShopAsync(Shop shop) {
            Shop existing = _context.Shops.FirstOrDefault(s => s.Id == shop.Id);

            if (existing == null) {
                _context.Shops.Add(shop);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateShopAsync(int id, Shop shop) {
            Shop existing = _context.Shops.FirstOrDefault(s => s.Id == id);

            if (existing == null)
                return;

            existing.Name = shop.Name;
            existing.Address = shop.Address;
            existing.Lat = shop.Lat;
            existing.Lng = shop.Lng;

            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteShopAsync(int id) {
            Shop shop = _context.Shops.FirstOrDefault(s => s.Id == id);

            if (shop == null)
                return false;
            else {
                _context.Shops.Remove(shop);
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public void CreateShop(Shop shop) {
            Shop existing = _context.Shops.FirstOrDefault(s => s.Id == shop.Id);

            if (existing == null) {
                _context.Shops.Add(shop);
                _context.SaveChanges();
            }
        }

        public void UpdateShop(int id, Shop shop) {
            Shop existing = _context.Shops.FirstOrDefault(s => s.Id == id);

            if (existing == null)
                return;

            existing.Name = shop.Name;
            existing.Address = shop.Address;
            existing.Lat = shop.Lat;
            existing.Lng = shop.Lng;

            _context.SaveChanges();
        }

        public bool DeleteShop(int id) {
            Shop shop = _context.Shops.FirstOrDefault(s => s.Id == id);

            if (shop == null)
                return false;
            else {
                _context.Shops.Remove(shop);
                _context.SaveChanges();
                return true;
            }
        }
    }
}
