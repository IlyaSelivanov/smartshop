using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartShop.Domain.Abstract;
using SmartShop.Domain.Entities;

namespace SmartShop.WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        IDomainRepository _repository;

        public ShopsController(IDomainRepository repository) {
            _repository = repository;
        }

        [HttpGet()]
        public IEnumerable<Shop> Get() {
            return _repository.Shops;
        }
    }
}