package tnut.blogback.config.jwt;

public interface JwtProperties {
    String ACCESS_SECRET = [ACCESS_SECRET];
    String REFRESH_SECRET = [REFRESH_SECRET];
    int ACCESS_EXPIRATION_TIME =  1000*60*30; //30분
    Long REFRESH_EXPIRATION_TIME = 1000L * 60 * 60 * 24 * 30; //30일
    String HEADER_ACCESS = [HEADER];
    String TOKEN_SUBJECT = [TOKEN_SUBJECT];
    String REDIRECT_URL = redirect_Uri;
}
