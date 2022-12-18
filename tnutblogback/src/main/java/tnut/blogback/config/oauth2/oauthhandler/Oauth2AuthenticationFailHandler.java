package tnut.blogback.config.oauth2.oauthhandler;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class Oauth2AuthenticationFailHandler extends SimpleUrlAuthenticationFailureHandler {
    //인증에 실패할 경우 해당 주소로 리다이렉트
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        getRedirectStrategy().sendRedirect(request, response, "http://localhost:3000");
    }
}
