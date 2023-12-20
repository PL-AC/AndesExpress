using Back_end_AndesExpress.Dto;
using Back_end_AndesExpress.Model;
using Back_end_AndesExpress.Repository;
using System.Data.SqlClient;
using System.Data;
using Back_end_AndesExpress.Connection;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace Back_end_AndesExpress.Service
{
    public class UserService : IUserRepository
    {
        DbConnection connection = new DbConnection();
        
        public async Task<User> AddUser(UserCreateDto u)
        {
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_InsertUser", sqlCn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@username", u.username);
                    cmd.Parameters.AddWithValue("@password", u.password);
                    await sqlCn.OpenAsync();
                    await cmd.ExecuteReaderAsync();
                }
            }
            var entry = new User
            {
                username = u.username,
                password = u.password,
            };
            return entry;
        }

        public async Task<List<UserDto>> GetAllUser()
        {
            var listUser = new List<UserDto>();
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_GetAllUser", sqlCn))
                {
                    await sqlCn.OpenAsync();
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (var item = await cmd.ExecuteReaderAsync())
                    {
                        while (await item.ReadAsync())
                        {
                            var user = new UserDto();
                            user.username = (string)item["username"];
                            listUser.Add(user);
                        }
                    }
                }
            }
            return listUser;
        }

        public async Task<UserResponseDto> Login(UserCreateDto u)
        {
            User userLogin = null;
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_GetUserLogin", sqlCn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@username", u.username);
                    cmd.Parameters.AddWithValue("@password", u.password);
                    await sqlCn.OpenAsync();
                    using (var item = await cmd.ExecuteReaderAsync())
                    {
                        while (await item.ReadAsync())
                        {
                            userLogin = new User()
                            {                                
                                username = (string)item["username"]
                            };
                        }
                    }
                }
            };

            if (userLogin == null) 
            {
                return new UserResponseDto()
                {
                    token = "",
                    user = null
                };
            }
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).
                    AddJsonFile("appsettings.json").Build();
            string keyString = builder.GetSection("JWTSettings:key").Value;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(keyString);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, u.username.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            UserResponseDto userResponseDto = new UserResponseDto()
            {
                token = tokenHandler.WriteToken(token),
                user = userLogin
            };

            return userResponseDto;
        }
    }
}
