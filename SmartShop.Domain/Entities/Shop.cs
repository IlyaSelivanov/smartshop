﻿using System.Collections.Generic;

namespace SmartShop.Domain.Entities {
    public class Shop {
        public int Id { get; set; }
        public string Name { get; set; }
        public Location Location { get; set; }
        public List<ShopProduct> ShopProducts { get; set; }

        public Shop() {
            ShopProducts = new List<ShopProduct>();
        }
    }

    public class Location {
        public double Lat { get; set; }
        public double Lng { get; set; }
    }

    public class ShopProduct {
        public int ShopId { get; set; }
        public Shop Shop { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}