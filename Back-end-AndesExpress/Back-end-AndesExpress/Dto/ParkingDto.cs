using System.ComponentModel.DataAnnotations;

namespace Back_end_AndesExpress.Dto
{
    public class ParkingCreateDto
    {

        [Required]
        public int parkingLotId { get; set; }
        [Required]
        public int carId { get; set; }
    }

    public class ParkingUpdateDto
    {
        [Key]
        public int id { get; set; }
        [Required]
        public int parkingLotId { get; set; }
        [Required]
        public int carId { get; set; }
        [Required]
        public DateTime departureDate { get; set; }
    }
    public class ParkingDto
    {
        [Key]
        public int id { get; set; }
        [Required]
        public int parkingLotId { get; set; }

        public string description { get; set; }

        public int places { get; set; }

        public int occupiedPlaces { get; set; }

        public int remainingPlaces { get; set; }

        public int idCar { get; set; }

        public string brand { get; set; }
        public string model { get; set; }
        public string plate { get; set; }
        public CarCreateDto car { get; set; }

        [Required]
        public int carId { get; set; }
        [Required]
        public DateTime entryDate { get; set; }
        
    }
}
