package tnut.blogback.controller.api.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.service.UserService;

@RestController
public class AdminUserApiController {
    public UserService userService;

    @Autowired
    public AdminUserApiController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin/api/users")
    public ResponseDto<?> userList () {
        return new ResponseDto<>(HttpStatus.OK.value(), userService.userList());
    }
}
