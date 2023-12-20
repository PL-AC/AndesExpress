using Back_end_AndesExpress.Dto;
using Back_end_AndesExpress.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back_end_AndesExpress.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/car")]
    public class CarController
    {
        public CarService carService = new CarService();

        [HttpGet]
        public async Task<ActionResult<List<CarDto>>> Get()
        {
            var listCar = await carService.GetAllCar();
            return listCar;
        }
        [HttpPost]
        public async Task<ActionResult<CarCreateDto>> Add(CarCreateDto c)
        {
            var added = await carService.AddCar(c);
            return added;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CarUpdateDto>> Edit(int id, CarUpdateDto c)
        {
            c.id = id;
            var edited = await carService.EditCar(c);
            return edited;
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await carService.DeleteCar(id);
        }

        [HttpGet("{plate}")]
        public async Task<ActionResult<CarDto>> GetCarPlate(string plate)
        {
            var car = await carService.GetCarByPlate(plate);
            return car;
        }
    }
}
