using System.ComponentModel.DataAnnotations;

namespace Back_end_AndesExpress.Dto
{
    public class CustomerCreateDto
    {
        [Required]
        public string fullName { get; set; }
        [Required]
        public string phone { get; set; }
        [Required]
        public string email { get; set; }
    }

    public class CustomerUpdateDto
    {
        [Required]
        public string fullName { get; set; }
        [Required]
        public string phone { get; set; }
        [Required]
        public string email { get; set; }
    }
    public class CustomerDto
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string fullName { get; set; }
        [Required]
        public string phone { get; set; }
        [Required]
        public string email { get; set; }
    }
}
