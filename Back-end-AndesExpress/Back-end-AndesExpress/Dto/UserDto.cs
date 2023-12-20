using Back_end_AndesExpress.Model;
using System.ComponentModel.DataAnnotations;

namespace Back_end_AndesExpress.Dto
{
    public class UserCreateDto
    {
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
    }

    public class UserUpdateDto
    {
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
    }
    public class UserDto
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
    }
    public class UserResponseDto 
    {
        public User user { get; set; }
        public string token { get; set; }

    }
}
