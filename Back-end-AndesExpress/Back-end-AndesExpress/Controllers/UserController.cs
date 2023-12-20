using Back_end_AndesExpress.Dto;
using Back_end_AndesExpress.Model;
using Back_end_AndesExpress.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back_end_AndesExpress.Controllers
{
    [ApiController]
    [Route("/user")]
    public class UserController
    {
        public UserService userService = new UserService();

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> Get()
        {
            var listUser = await userService.GetAllUser();
            return listUser;
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<User>> Add(UserCreateDto u)
        {
            var added = await userService.AddUser(u);
            return added;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserResponseDto>> LoginUser(UserCreateDto u)
        {
            var responseLogin = await userService.Login(u);
            return responseLogin;
        }

    }
}
