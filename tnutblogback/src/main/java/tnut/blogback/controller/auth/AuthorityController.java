package tnut.blogback.controller.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import tnut.blogback.config.auth.PrincipalDetails;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.model.User;
import tnut.blogback.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class AuthorityController {

    private UserRepository userRepository;

    @Autowired
    public AuthorityController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/authority")
    public ResponseDto<?> authority(@AuthenticationPrincipal PrincipalDetails principal) {

        User user = userRepository.findByUsername(principal.getUser().getUsername());

        Map<String, String> userAuthority = new HashMap<>();
        userAuthority.put("role", user.getRoleType().toString());
        userAuthority.put("username", user.getUsername());

        return new ResponseDto<>(HttpStatus.OK.value(), userAuthority);
    }

}
