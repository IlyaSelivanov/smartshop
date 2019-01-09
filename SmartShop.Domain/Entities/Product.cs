using System.Collections.Generic;

namespace SmartShop.Domain.Entities {
    public class Product {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }

    public class Category {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Product> Products { get; set; }

        public Category() {
            Products = new List<Product>();
        }
    }

    public class Shop {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
