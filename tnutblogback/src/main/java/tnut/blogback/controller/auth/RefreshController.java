package tnut.blogback.controller.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

import static tnut.blogback.config.jwt.JwtProperties.*;

@RestController
public class RefreshController {

    private final UserRepository userRepository;

    public RefreshController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/refresh") //new access 토큰 발급
    public ResponseDto<?> refresh ( HttpServletRequest request) { //refresh token을 받아서

        //refresh Token 검증
        String username = JWT.require(Algorithm.HMAC512(REFRESH_SECRET)).build()
                .verify(request.getHeader("RefreshToken"))
                .getClaim("username")
                .asString();

        if (username != null) {

            String accessToken = JWT.create()
                    .withSubject(TOKEN_SUBJECT)
                    .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_EXPIRATION_TIME))
                    .withClaim("username", username)
                    .sign(Algorithm.HMAC512(ACCESS_SECRET));

            return new ResponseDto<>(HttpStatus.OK.value(), accessToken); //새로운 access토큰을 반환
        } else {
            //refresh token이 만료되었다면
            return new ResponseDto<>(HttpStatus.UNAUTHORIZED.value(), "재 로그인이 필요합니다." );
        }
    }

}
