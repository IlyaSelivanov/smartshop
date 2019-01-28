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
        public async Task<IActionResult> DeleteAsync(int id) {
            bool result = await _repository.DeleteShopAsync(id);

            if (result)
                return Ok();
            else
                return NotFound();
        }

        [HttpPost()]
        public async Task<IActionResult> PostAsync([FromBody] Shop shop) {
            await _repository.CreateShopAsync(shop);
            return Ok();
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> PostAsync(int id, [FromBody] Shop shop) {
            await _repository.UpdateShopAsync(id, shop);
            return Ok();
        }
    }
}