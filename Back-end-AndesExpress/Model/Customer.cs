using System.ComponentModel.DataAnnotations;

namespace Model
{
    public class Customer
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string fullName { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string phone { get; set; }
        
    }
}