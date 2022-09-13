package tnut.blogback.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tnut.blogback.config.auth.PrincipalDetails;
import tnut.blogback.dto.UsernameDto;
import tnut.blogback.model.Reply;
import tnut.blogback.model.User;
import tnut.blogback.repository.UserRepository;

import java.util.List;

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

        String nickName = usernameDto.getChangingNickname();

        userEntity.setNickname(nickName);

        List<Reply> replies = userEntity.getReplies();
        replies.forEach(reply -> reply.setUsername(nickName)); //댓글에 저장된 username도 바꿔주기

        return userEntity;
    }

    @Transactional
    public List<User> userList() {
        return userRepository.findAll();
    }

}
