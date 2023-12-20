using Back_end_AndesExpress.Dto;

namespace Back_end_AndesExpress.Repository
{
    public interface ICarRepository
    {
        Task<List<CarDto>> GetAllCar();
        Task<CarCreateDto> AddCar(CarCreateDto c);
        Task<CarUpdateDto> EditCar(CarUpdateDto c);
        Task DeleteCar(int id);

        Task<CarDto> GetCarByPlate(string plate);
    }
}
