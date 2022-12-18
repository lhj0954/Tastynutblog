package tnut.blogback.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import tnut.blogback.config.auth.PrincipalDetails;
import tnut.blogback.model.User;
import tnut.blogback.repository.UserRepository;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static tnut.blogback.config.jwt.JwtProperties.*;

//BasicAuthenticationFilter 무조건 권한 인증 요구하는 페이지 요청시 거쳐가게 되어 있다.
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final UserRepository userRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String accessToken = request.getHeader(HEADER_ACCESS);

        //header에 jwt토큰이 제대로 들어가 있는지 확인
        if (accessToken == null) {
            chain.doFilter(request, response); //jwt토큰이 없다면 그대로 filter 진행(후에 인가가 필요한 요청이 아닌 경우이다.)
        } else {

            //jwt토큰을 통해 비정상적인 사용자인지 확인 accessToken
            String username = JWT.require(Algorithm.HMAC512(ACCESS_SECRET)).build()
                    .verify(accessToken)
                    .getClaim("username")
                    .asString();

            //유효한 jwt토큰이 들어왔다면
            if (username != null) {
                User userEntity = userRepository.findByUsername(username);

                PrincipalDetails principalDetails = new PrincipalDetails(userEntity);

                //jwt 토큰 서명에 근거해서 만들어진 authentication 객체
                Authentication authentication =
                        new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities()); //RoleType지정에 필요함

                //강제로 시큐리티 세션에 접근하여 authentication객체를 저장(JWT로 인증을 마쳤기 때문이다.)
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            //이후 필터 진행
            chain.doFilter(request, response);
        }
    }
}
