package tnut.blogback.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tnut.blogback.config.auth.PrincipalDetails;
import tnut.blogback.dto.UsernameDto;
import tnut.blogback.model.User;
import tnut.blogback.repository.UserRepository;

@Service
public class UserService {
    final
    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public User userInfo(String nickname) {
        return userRepository.findByNickname(nickname);
    }

    @Transactional
    public boolean checkNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional
    public User changeNickname(UsernameDto usernameDto, PrincipalDetails principalDetails) {
        User userEntity = userRepository.findByUsername(principalDetails.getUser().getUsername());

        userEntity.setNickname(usernameDto.getChangingNickname());

        return userEntity;
    }

}
