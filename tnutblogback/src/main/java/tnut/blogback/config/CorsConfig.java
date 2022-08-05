package tnut.blogback.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

//@CrossOrigin : 인증이 없을 때 사용

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true); //내 서버가 응답을 할 때 json을 자바스크립트에서 처리할 수 있게 하는지 설정
        configuration.addAllowedOriginPattern("*"); //모든 요청 응답 허용
        configuration.addAllowedHeader("*"); //모든 header에 응답 허용
        configuration.addAllowedMethod("*"); //모든 restful 요청 허용
        source.registerCorsConfiguration("/**",configuration);
        return new CorsFilter(source);
    }
}
