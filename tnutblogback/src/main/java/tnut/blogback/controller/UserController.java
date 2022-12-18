package tnut.blogback.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import tnut.blogback.config.auth.PrincipalDetails;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.service.UserService;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/api/info")
    public ResponseDto<?> userInfo (@AuthenticationPrincipal PrincipalDetails principal) {
        return new ResponseDto<>(HttpStatus.OK.value(), userService.userInfo(principal.getUser().getUsername()));
    }

    @GetMapping("/new-nickname/{newNickname}")
    public ResponseDto<Boolean> checkNickname(@PathVariable String newNickname) {
        return new ResponseDto<>(HttpStatus.OK.value(), userService.checkNickname(newNickname));
    }

}
