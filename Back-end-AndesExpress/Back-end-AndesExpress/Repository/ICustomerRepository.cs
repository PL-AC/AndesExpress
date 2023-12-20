using Model;
using Back_end_AndesExpress.Dto;

namespace Back_end_AndesExpress.Repository
{
    public interface ICustomerRepository
    {
        Task<List<CustomerDto>> GetAllCustomer();
        Task<CustomerCreateDto> AddCustomer(CustomerCreateDto c);
        Task<CustomerDto> EditCustomer(CustomerDto c);
        Task DeleteCustomer(int id);
        
    }
}
