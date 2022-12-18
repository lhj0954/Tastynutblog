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
        //카카오로 유저정보를 받아오면 이메일이 Map 형식으로 담겨져 온다.
        Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");

        return (String) kakao_account.get("email");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }
}
