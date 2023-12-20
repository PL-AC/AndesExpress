using Back_end_AndesExpress.Connection;
using Back_end_AndesExpress.Dto;
using Back_end_AndesExpress.Repository;
using System.Data.SqlClient;
using System.Data;

namespace Back_end_AndesExpress.Service
{
    public class CustomerService : ICustomerRepository
    {
        DbConnection connection = new DbConnection();
        public async Task<CustomerCreateDto> AddCustomer(CustomerCreateDto c)
        {
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_InsertCustomer", sqlCn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@fullName", c.fullName);
                    cmd.Parameters.AddWithValue("@phone", c.phone);
                    cmd.Parameters.AddWithValue("@email", c.email);
                    await sqlCn.OpenAsync();
                    await cmd.ExecuteReaderAsync();
                }
            }
            return c;
        }

        public async Task DeleteCustomer(int id)
        {
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_DeleteCustomer", sqlCn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idCustomer", id);
                    await sqlCn.OpenAsync();
                    await cmd.ExecuteReaderAsync();
                }
            }
        }

        public async Task<CustomerDto> EditCustomer(CustomerDto c)
        {
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_UpdateCustomer", sqlCn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idCustomer", c.id);
                    cmd.Parameters.AddWithValue("@fullName", c.fullName);
                    cmd.Parameters.AddWithValue("@phone", c.phone);
                    cmd.Parameters.AddWithValue("@email", c.email);
                    await sqlCn.OpenAsync();
                    await cmd.ExecuteReaderAsync();
                }
            }
            return c;
        }

        public async Task<List<CustomerDto>> GetAllCustomer()
        {
            var listCustomer = new List<CustomerDto>();
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_GetAllCustomer", sqlCn))
                {
                    await sqlCn.OpenAsync();
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (var item = await cmd.ExecuteReaderAsync())
                    {
                        while (await item.ReadAsync())
                        {
                            var customer = new CustomerDto();
                            customer.id = (int)item["idCustomer"];
                            customer.fullName = (string)item["fullName"];
                            customer.phone = (string)item["phone"];
                            customer.email = (string)item["email"];
                            listCustomer.Add(customer);
                        }
                    }
                }
            }
            return listCustomer;
        }
    }
}
