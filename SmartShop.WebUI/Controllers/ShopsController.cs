using Microsoft.AspNetCore.Mvc;
using SmartShop.Domain.Abstract;
using SmartShop.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartShop.WebUI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase {
        IDomainRepository _repository;

        public ShopsController(IDomainRepository repository) {
            _repository = repository;
        }

        [HttpGet()]
        public IEnumerable<Shop> Get() {
            return _repository.Shops;
        }

        [HttpGet("{id}")]
        public Shop Get(int id) {
            return _repository.Shops.FirstOrDefault(s => s.Id == id);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            bool result = _repository.DeleteShop(id);

            if (result)
                return Ok();
            else
                return NotFound();
        }

        [HttpPost()]
        public IActionResult Post([FromBody] Shop shop) {
            _repository.CreateShop(shop);
            return Ok();
        }

        [HttpPost("{id}")]
        public IActionResult Post(int id, [FromBody] Shop shop) {
            _repository.UpdateShop(id, shop);
            return Ok();
        }
    }
}