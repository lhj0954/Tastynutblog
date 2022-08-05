package tnut.blogback.config.oauth2.provider;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo{

    private final Map<String, Object> attributes;

    public KakaoUserInfo(Map<String, Object> attributes) {
        this.attributes=attributes;
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getProviderID() {
        return String.valueOf(attributes.get("id"));
    }

    @Override
    public String getEmail() {
        Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");

        return (String) kakao_account.get("email");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }
}
