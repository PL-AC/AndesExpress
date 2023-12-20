using Back_end_AndesExpress.Dto;
using Back_end_AndesExpress.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Back_end_AndesExpress.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/parking")]
    public class ParkingControler
    {
        public ParkingService parkingService = new ParkingService();

        [HttpGet]
        public async Task<ActionResult<List<ParkingDto>>> Get()
        {
            var listParking = await parkingService.GetAllParking();
            return listParking;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<ParkingDto>>> GetByLot(int id)
        {
            var listParkingByLot = await parkingService.GetParkingByLot(id);
            return listParkingByLot;
        }

        [HttpPost]
        public async Task<ActionResult<ParkingCreateDto>> Add(ParkingCreateDto p)
        {
            var added = await parkingService.AddParking(p);
            return added;
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await parkingService.DeleteParking(id);
        }

    }
}
