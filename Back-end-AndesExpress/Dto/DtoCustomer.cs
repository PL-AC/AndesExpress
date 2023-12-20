using Back_end_AndesExpress.Connection;
using Model;
using System.Data;
using System.Data.SqlClient;

namespace Dto
{
    public class DtoCustomer
    {
        DbConnection connection = new DbConnection();
        public async Task<List<Customer>> GetAllCustomer() 
        {
            var listCustomer = new List<Customer>();
            using (var sqlCn = new SqlConnection(connection.connectionSql())) 
            {
                using(var cmd = new SqlCommand("sp_GetAllCustomer",sqlCn)) 
                { 
                    await sqlCn.OpenAsync();
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (var item = await cmd.ExecuteReaderAsync())
                    {
                        while (await item.ReadAsync())
                        { 
                            var customer = new Customer();
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