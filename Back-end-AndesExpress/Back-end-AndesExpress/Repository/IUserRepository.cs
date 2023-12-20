using Model;
using Back_end_AndesExpress.Dto;
using Back_end_AndesExpress.Model;

namespace Back_end_AndesExpress.Repository
{
    public interface IUserRepository
    {
        Task<List<UserDto>> GetAllUser();
        Task<UserResponseDto> Login(UserCreateDto u);
        Task<User> AddUser(UserCreateDto u);
        /*Task<CustomerDto> EditCustomer(CustomerDto c);
        Task DeleteCustomer(int id);*/
        
    }
}
