package tnut.blogback.repository.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import tnut.blogback.model.auth.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findByUsername(String username);
    void deleteByUsername(String username);
}
