package tnut.blogback.config.oauth2;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import tnut.blogback.config.auth.PrincipalDetails;
import tnut.blogback.config.oauth2.provider.GoogleUserInfo;
import tnut.blogback.config.oauth2.provider.KakaoUserInfo;
import tnut.blogback.config.oauth2.provider.NaverUserInfo;
import tnut.blogback.config.oauth2.provider.OAuth2UserInfo;
import tnut.blogback.model.RoleType;
import tnut.blogback.model.User;
import tnut.blogback.repository.UserRepository;

import java.util.Map;
import java.util.Objects;
import java.util.UUID;

// SecurityConfig의 Oauth2의 후처리
@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public PrincipalOauth2UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    //provider로 부터 받은 userRequest 후처리
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        //oauth2 로그인 완료 후 받은 회원 정보
        OAuth2User oAuth2User = super.loadUser(userRequest);

        //Oauth2UserInfo 초기화
        OAuth2UserInfo oAuth2UserInfo = null;

        //프로바이더에 맞춰서 Oauth2UserInfo 정보 입력
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            oAuth2UserInfo = new NaverUserInfo((Map) oAuth2User.getAttributes().get("response"));
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        }

        //user에 넣을 정보
        String provider = Objects.requireNonNull(oAuth2UserInfo).getProvider();
        String providerId = oAuth2UserInfo.getProviderID();
        String username = provider + "_" + providerId; //고유 유저네임 생성
        String nickname = provider + "_" + providerId; //임시 닉네임
        String password = bCryptPasswordEncoder.encode(UUID.randomUUID().toString());
        String email = oAuth2UserInfo.getEmail();
        RoleType roleType = RoleType.ROLE_USER;

        //해당 attribute로 가입된 유저 정보 찾기
        User userEntity = userRepository.findByUsername(username);

        //처음 로그인 시도라면 db에 유저 저장
        if (userEntity == null) {
            System.out.println("첫 oauth 로그인");
            userEntity = User.builder()
                    .username(username)
                    .nickname(nickname)
                    .password(password)
                    .email(email)
                    .roleType(roleType)
                    .provider(provider)
                    .providerId(providerId)
                    .build();
            userRepository.save(userEntity); //회원 정보로 자동 회원가입
        }

        return new PrincipalDetails(userEntity, oAuth2User.getAttributes()); //=>authentication 객체
    }
}
