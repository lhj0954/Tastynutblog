package tnut.blogback.config.oauth2.provider;

import java.util.Map;

public class GoogleUserInfo implements OAuth2UserInfo{

    private final Map<String, Object> attributes;

    public GoogleUserInfo(Map<String, Object> attributes) {
        this.attributes=attributes;
    }

    @Override
    public String getProvider() {
        return "google";
    }

    @Override
    public String getProviderID() {
        return (String) attributes.get("sub");
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
