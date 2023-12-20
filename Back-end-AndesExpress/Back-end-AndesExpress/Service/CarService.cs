using Back_end_AndesExpress.Dto;
using Back_end_AndesExpress.Repository;
using System.Data.SqlClient;
using System.Data;
using Back_end_AndesExpress.Connection;
using Model;

namespace Back_end_AndesExpress.Service
{
    public class CarService : ICarRepository
    {
        DbConnection connection = new DbConnection();
        public async Task<CarCreateDto> AddCar(CarCreateDto car)
        {
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_InsertCar", sqlCn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idCustomer", car.customerId);
                    cmd.Parameters.AddWithValue("@brand", car.brand);
                    cmd.Parameters.AddWithValue("@model", car.model);
                    cmd.Parameters.AddWithValue("@plate", car.plate);
                    await sqlCn.OpenAsync();
                    await cmd.ExecuteReaderAsync();
                }
            }
            return car;
        }

        public async Task DeleteCar(int id)
        {
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_DeleteCar", sqlCn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idCar", id);
                    await sqlCn.OpenAsync();
                    await cmd.ExecuteReaderAsync();
                }
            }
        }

        public async Task<CarUpdateDto> EditCar(CarUpdateDto car)
        {
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_UpdateCar", sqlCn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idCar", car.id);
                    cmd.Parameters.AddWithValue("@idCustomer", car.customerId);
                    cmd.Parameters.AddWithValue("@brand", car.brand);
                    cmd.Parameters.AddWithValue("@model", car.model);
                    cmd.Parameters.AddWithValue("@plate", car.plate);
                    await sqlCn.OpenAsync();
                    await cmd.ExecuteReaderAsync();
                }
            }
            return car;
        }

        public async Task<List<CarDto>> GetAllCar()
        {
            var listCar= new List<CarDto>();
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_GetAllCar", sqlCn))
                {
                    await sqlCn.OpenAsync();
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (var item = await cmd.ExecuteReaderAsync())
                    {
                        while (await item.ReadAsync())
                        {
                            var car = new CarDto();
                            car.customer = new CustomerCreateDto();
                            car.id = (int)item["idCar"];
                            car.customer.fullName = (string)item["fullName"];
                            car.plate = (string)item["plate"];
                            car.brand = (string)item["brand"];
                            car.model = (string)item["model"];
                            listCar.Add(car);
                        }
                    }
                }
            }
            return listCar;
        }

        public async Task<CarDto> GetCarByPlate(string plate)
        {
            var car = new CarDto();
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_GetCarByPlate", sqlCn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@plate", plate);
                    await sqlCn.OpenAsync();
                    using (var item = await cmd.ExecuteReaderAsync())
                    {
                        while (await item.ReadAsync())
                        {
                            car.customer = new CustomerCreateDto();
                            car.id = (int)item["idCar"];
                            car.customer.fullName = (string)item["fullName"];
                            car.plate = (string)item["plate"];
                            car.brand = (string)item["brand"];
                            car.model = (string)item["model"];
                        }
                    }
                }
            }
            return car;
        }
    }
}
