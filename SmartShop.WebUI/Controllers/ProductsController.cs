using Microsoft.AspNetCore.Mvc;
using SmartShop.Domain.Abstract;
using SmartShop.Domain.Entities;
using System.Collections.Generic;

namespace SmartShop.WebUI.Controllers {
    [Route("api/[controller]")]
    public class ProductsController : Controller {
        IDomainRepository _repository;

        public ProductsController(IDomainRepository repository) {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public IEnumerable<Product> List() {
            return _repository.Products;
        }
    }
}
