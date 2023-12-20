using System.ComponentModel.DataAnnotations;

namespace Back_end_AndesExpress.Dto
{
    public class CarCreateDto
    {
        public int customerId { get; set; }
        [Required]
        public string brand { get; set; }
        [Required]
        public string model { get; set; }
        [Required]
        public string plate { get; set; }
    }

    public class CarUpdateDto
    {
        [Key]
        public int id { get; set; }
        public int customerId { get; set; }
        [Required]
        public string brand { get; set; }
        [Required]
        public string model { get; set; }
        [Required]
        public string plate { get; set; }
    }
    public class CarDto
    {
        [Key]
        public int id { get; set; }
        [Required]
        public int customerId { get; set; }

        public CustomerCreateDto customer { get; set; }

        [Required]
        public string brand { get; set; }
        [Required]
        public string model { get; set; }
        [Required]
        public string plate { get; set; }
    }
}
