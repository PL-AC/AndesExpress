using System.ComponentModel.DataAnnotations;

namespace Back_end_AndesExpress.Model
{
    public class User
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
    }
}
