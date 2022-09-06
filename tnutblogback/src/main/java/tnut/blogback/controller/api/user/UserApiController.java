package tnut.blogback.controller.api.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.service.UserService;

@RequiredArgsConstructor
@RestController
public class UserApiController {
    UserService userService;

    @Autowired
    public UserApiController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/{id}/info")
    public ResponseDto<?> userInfo (@PathVariable Long id) {
        return new ResponseDto<>(HttpStatus.OK.value(), userService.userInfo(id));
    }
}
