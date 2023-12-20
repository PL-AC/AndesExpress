using Back_end_AndesExpress.Dto;

namespace Back_end_AndesExpress.Repository
{
    public interface IParkingRepository
    {
        Task<List<ParkingDto>> GetAllParking();
        Task<ParkingCreateDto> AddParking(ParkingCreateDto p);
        Task<ParkingUpdateDto> EditParking(ParkingUpdateDto p);
        Task DeleteParking(int id);
        Task<List<ParkingDto>> GetParkingByLot(int id);
    }
}
