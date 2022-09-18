package tnut.blogback.config.jwt;

public interface JwtProperties {
    String ACCESS_SECRET = "acToken123";
    String REFRESH_SECRET = "rsToken123";
    int ACCESS_EXPIRATION_TIME =  1000*60*30; //30분
    Long REFRESH_EXPIRATION_TIME = 1000L * 60 * 60 * 24 * 30; //30일
    String HEADER_ACCESS = "AccessToken";
    String TOKEN_SUBJECT = "Tnut's subject";
    String REDIRECT_URL = "http://localhost:3000/oauth/redirect?";
}
