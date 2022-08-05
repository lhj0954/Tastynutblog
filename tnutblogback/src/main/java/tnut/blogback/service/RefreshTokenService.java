package tnut.blogback.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tnut.blogback.model.auth.RefreshToken;
import tnut.blogback.repository.auth.RefreshTokenRepository;

@Service
public class RefreshTokenService {

    public final RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Transactional
    public void refreshTokenSave (String refreshToken, String username) {

        RefreshToken refreshTokenEntity = RefreshToken.builder()
                .refreshToken(refreshToken)
                .username(username)
                .build();

         refreshTokenRepository.save(refreshTokenEntity);
    }

    @Transactional
    public RefreshToken refreshTokenFind (String username) {
        return refreshTokenRepository.findByUsername(username);
    }

    @Transactional
    public void refreshTokenDelete (String username) {
        refreshTokenRepository.deleteByUsername(username);
    }
}
