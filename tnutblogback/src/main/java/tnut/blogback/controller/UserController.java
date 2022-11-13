package tnut.blogback.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import tnut.blogback.config.auth.PrincipalDetails;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.service.UserService;

@RequiredArgsConstructor
@RestController
public class UserController {
    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/api/info")
    public ResponseDto<?> userInfo (@AuthenticationPrincipal PrincipalDetails principal) {
        return new ResponseDto<>(HttpStatus.OK.value(), userService.userInfo(principal.getUser().getUsername()));
    }

    @GetMapping("/{nickname}/check-nickname")
    public ResponseDto<Boolean> checkNickname(@PathVariable String nickname) {
        return new ResponseDto<>(HttpStatus.OK.value(), userService.checkNickname(nickname));
    }

}
