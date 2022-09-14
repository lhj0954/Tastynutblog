package tnut.blogback.controller.api.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import tnut.blogback.config.auth.PrincipalDetails;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.dto.UsernameDto;
import tnut.blogback.service.UserService;

@RequiredArgsConstructor
@RestController
public class UserApiController {
    UserService userService;

    @Autowired
    public UserApiController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/api/info")
    public ResponseDto<?> userInfo (@AuthenticationPrincipal PrincipalDetails principal) {
        return new ResponseDto<>(HttpStatus.OK.value(), userService.userInfo(principal.getUser().getUsername()));
    }

    @GetMapping("/{nickname}/checkNickname")
    public ResponseDto<Boolean> checkNickname(@PathVariable String nickname) {
        return new ResponseDto<>(HttpStatus.OK.value(), userService.checkNickname(nickname));
    }

    @PutMapping("/user/api/changeNickname") // jwt의 username 이용
    public ResponseDto<?> changeNickname (@RequestBody UsernameDto usernameDto, @AuthenticationPrincipal PrincipalDetails principal) {
        return new ResponseDto<>(HttpStatus.OK.value(), userService.changeNickname(usernameDto, principal));
    }
}
