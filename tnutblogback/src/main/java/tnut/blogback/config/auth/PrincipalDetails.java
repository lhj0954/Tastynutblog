package tnut.blogback.config.auth;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import tnut.blogback.model.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Data
public class PrincipalDetails implements  OAuth2User {


    private User user;
    private Map<String, Object> attributes;

    public PrincipalDetails(User user) {
        this.user=user;
    }

    //Oauth 로그인
    public PrincipalDetails(User user, Map<String, Object> attributes) {
        this.user=user;
        this.attributes=attributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getName() {
        return user.getUsername();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add((GrantedAuthority) () -> user.getRoleType().toString());
        return collection;
    }

}
