using Back_end_AndesExpress.Dto;
using Back_end_AndesExpress.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back_end_AndesExpress.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/customer")]
    public class CustomerController
    {
        public CustomerService customerService = new CustomerService();
                
        [HttpGet]
        public async Task<ActionResult<List<CustomerDto>>> Get()
        {
            var listCustomer = await customerService.GetAllCustomer();
            return listCustomer;
        }
        [HttpPost]
        public async Task<ActionResult<CustomerCreateDto>> Add(CustomerCreateDto c)
        {
            var added = await customerService.AddCustomer(c);
            return added;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CustomerDto>> Edit(int id, CustomerDto c)
        {
            c.id = id;
            var edited = await customerService.EditCustomer(c);
            return edited;
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await customerService.DeleteCustomer(id);
        }
    }
}
