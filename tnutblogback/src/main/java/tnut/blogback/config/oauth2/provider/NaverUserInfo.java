package tnut.blogback.config.oauth2.provider;

import java.util.Map;

public class NaverUserInfo implements OAuth2UserInfo{

    private final Map<String, Object> attributes;

    public NaverUserInfo(Map<String, Object> attributes) {
        this.attributes=attributes;
    }

    @Override
    public String getProvider() {
        return "naver";
    }

    @Override
    public String getProviderID() {
        return (String) attributes.get("id");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }
}
