package tnut.blogback.config.oauth2.oauthhandler;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import tnut.blogback.config.auth.PrincipalDetails;
import tnut.blogback.service.RefreshTokenService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

import static tnut.blogback.config.jwt.JwtProperties.*;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        //기존 username으로 있는 refresh토큰 삭제
        if (refreshTokenService.refreshTokenFind(principalDetails.getUser().getUsername()) != null) {
            refreshTokenService.refreshTokenDelete(principalDetails.getUser().getUsername());
        }

        String accessToken = JWT.create()
                .withSubject(TOKEN_SUBJECT)
                .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_EXPIRATION_TIME))
                .withClaim("username", principalDetails.getUser().getUsername())
                .sign(Algorithm.HMAC512(ACCESS_SECRET));

        String refreshToken = JWT.create()
                .withSubject(TOKEN_SUBJECT)
                .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_EXPIRATION_TIME))
                .withClaim("username", principalDetails.getUser().getUsername())
                .sign(Algorithm.HMAC512(REFRESH_SECRET));

        //db에 refreshToken 저장
        refreshTokenService.refreshTokenSave(refreshToken, principalDetails.getUser().getUsername());

        //accessToken과 refreshToken을 주소에 담아서 반환
        getRedirectStrategy().sendRedirect(request, response, REDIRECT_URL + "accessToken=" + accessToken + "&refreshToken=" + refreshToken);
    }
}
