using System.Collections.Generic;

namespace SmartShop.Domain.Entities {
    public class Product {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int? CategoryId { get; set; }
        public Category Category { get; set; }

        public List<ShopProduct> ShopProducts { get; set; }

        public Product() {
            ShopProducts = new List<ShopProduct>();
        }
    }
}
