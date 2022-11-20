package tnut.blogback.controller.api.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import tnut.blogback.config.auth.PrincipalDetails;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.dto.userDTO.NicknameDto;
import tnut.blogback.service.UserService;

@RequiredArgsConstructor
@RestController
public class UserApiController {
    UserService userService;

    @Autowired
    public UserApiController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/user/api/nickname") // jwt의 username 이용
    public ResponseDto<?> changeNickname (@RequestBody NicknameDto nicknameDto, @AuthenticationPrincipal PrincipalDetails principal) {
        return new ResponseDto<>(HttpStatus.OK.value(), userService.changeNickname(nicknameDto, principal));
    }
}
