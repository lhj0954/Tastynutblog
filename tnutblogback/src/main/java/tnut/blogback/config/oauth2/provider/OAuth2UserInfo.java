package tnut.blogback.config.oauth2.provider;

public interface OAuth2UserInfo {
    String getProvider();
    String getProviderID();
    String getEmail();
    String getName();
}
