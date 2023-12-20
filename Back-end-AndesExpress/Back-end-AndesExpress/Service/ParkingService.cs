using Back_end_AndesExpress.Connection;
using Back_end_AndesExpress.Dto;
using Back_end_AndesExpress.Repository;
using System.Data.SqlClient;
using System.Data;

namespace Back_end_AndesExpress.Service
{
    public class ParkingService : IParkingRepository
    {
        DbConnection connection = new DbConnection();

        public async Task<ParkingCreateDto> AddParking(ParkingCreateDto p)
        {
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_InsertParking", sqlCn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idParkingLot", p.parkingLotId);
                    cmd.Parameters.AddWithValue("@idCar", p.carId);
                    await sqlCn.OpenAsync();
                    await cmd.ExecuteReaderAsync();
                }
            }
            return p;
        }

        public async Task DeleteParking(int id)
        {
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_DeleteCarParking", sqlCn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idCar", id);
                    await sqlCn.OpenAsync();
                    await cmd.ExecuteReaderAsync();
                }
            }
        }

        public Task<ParkingUpdateDto> EditParking(ParkingUpdateDto p)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ParkingDto>> GetAllParking()
        {
            var listParking = new List<ParkingDto>();
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_GetAllParking", sqlCn))
                {
                    await sqlCn.OpenAsync();
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (var item = await cmd.ExecuteReaderAsync())
                    {
                        while (await item.ReadAsync())
                        {
                            var p = new ParkingDto();
                            p.id = (int)item["idParkingLot"];
                            p.description = (string)item["description"];
                            p.places = (int)item["places"];
                            p.occupiedPlaces = (int)item["occupiedPlaces"];
                            p.remainingPlaces = (int)item["remainingPlaces"];
                            listParking.Add(p);
                        }
                    }
                }
            }
            return listParking;
        }

        public async Task<List<ParkingDto>> GetParkingByLot(int id)
        {
            var listParking = new List<ParkingDto>();
            using (var sqlCn = new SqlConnection(connection.connectionSql()))
            {
                using (var cmd = new SqlCommand("sp_GetAllParkingByLot", sqlCn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idParkingLot", id);
                    await sqlCn.OpenAsync();
                    using (var item = await cmd.ExecuteReaderAsync())
                    {
                        while (await item.ReadAsync())
                        {
                            var p = new ParkingDto();
                            var car = new CarCreateDto();
                            p.id = (int)item["idParkingLot"];
                            p.description = (string)item["description"];
                            p.idCar = (int)item["idCar"];
                            p.brand = (string)item["brand"];
                            p.model = (string)item["model"];
                            p.plate = (string)item["plate"];
                            p.entryDate = (DateTime)item["entryDate"];
                            listParking.Add(p);
                        }
                    }
                }
            }
            return listParking;
        }
    }
}
