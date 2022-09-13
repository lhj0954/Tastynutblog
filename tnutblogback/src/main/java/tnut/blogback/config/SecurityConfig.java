package tnut.blogback.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import tnut.blogback.config.jwt.JwtAuthorizationFilter;
import tnut.blogback.config.oauth2.PrincipalOauth2UserService;
import tnut.blogback.config.oauth2.oauthhandler.OAuth2AuthenticationSuccessHandler;
import tnut.blogback.config.oauth2.oauthhandler.Oauth2AuthenticationFailHandler;
import tnut.blogback.repository.UserRepository;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig {

    private final UserRepository userRepository;

    private final PrincipalOauth2UserService principalOauth2UserService;

    private final CorsConfig corsConfig;

    public SecurityConfig(PrincipalOauth2UserService principalOauth2UserService, CorsConfig corsConfig, UserRepository userRepository ) {
        this.principalOauth2UserService = principalOauth2UserService;
        this.corsConfig = corsConfig;
        this.userRepository = userRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .csrf().disable()
                .httpBasic().disable()
                .formLogin().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests(authorize->authorize
                        .antMatchers("/admin/**")
                        .access("hasRole('ROLE_TNUT')")
                        .antMatchers("/user/**")
                        .access("hasRole('ROLE_USER') or hasRole('ROLE_TNUT')")
                        .anyRequest().permitAll())
                .apply(new MyCustomDsl())
                .and()
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("http://localhost:3000/login")
                        .userInfoEndpoint(userinfo -> userinfo
                                .userService(principalOauth2UserService))
                        .successHandler(oAuth2AuthenticationSuccessHandler())
                        .failureHandler(oAuth2AuthenticationFailHandler())
                );

        return httpSecurity.build();
    }

    public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) {

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            builder
                    .addFilter(corsConfig.corsFilter())
                    .addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository));
        }
    }

    @Bean
    public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        return new OAuth2AuthenticationSuccessHandler();
    }

    @Bean
    public Oauth2AuthenticationFailHandler oAuth2AuthenticationFailHandler() {
        return new Oauth2AuthenticationFailHandler();
    }
}
