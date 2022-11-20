package tnut.blogback.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tnut.blogback.config.auth.PrincipalDetails;
import tnut.blogback.dto.boardDTO.BoardServiceDto;
import tnut.blogback.dto.userDTO.*;
import tnut.blogback.model.User;
import tnut.blogback.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserInfoDto userInfo(String username) {
        User userEntity = userRepository.findByUsername(username);

        List<UserReplyInfoDto> replies = new ArrayList<>();
        UserReplyListDto userReplyListDto = new UserReplyListDto();

        userEntity.getReplies().forEach(reply ->
        {
            BoardServiceDto boardServiceDto = new BoardServiceDto(reply.getBoard().getId(), reply.getBoard().getTitle(), reply.getBoard().getContent(), reply.getBoard().getSubCategory().getSubCategoryName());
            replies.add(new UserReplyInfoDto(boardServiceDto, reply.getCreateDate(), reply.getContent(), reply.getId()));
        });

        userReplyListDto.setUserReplyInfoDtoList(replies);
        userReplyListDto.setTotal(replies.size());

        return new UserInfoDto(
                userEntity.getId(),
                userEntity.getRoleType(),
                userEntity.getNickname(),
                userEntity.getCreateDate(),
                userReplyListDto);
    }

    @Transactional
    public boolean checkNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional
    public UserServiceDto changeNickname(NicknameDto nicknameDto, PrincipalDetails principalDetails) {
        User userEntity = userRepository.findByUsername(principalDetails.getUser().getUsername());

        userEntity.setNickname(nicknameDto.getChangingNickname());

        return new UserServiceDto
                (
                        userEntity.getNickname(),
                        userEntity.getProvider()
                );
    }

    @Transactional
    public UserListDto userList() {
        List<User> userList = userRepository.findAll();

        List<UserInfoDto> userInfoDtoList = new ArrayList<>();
        List<UserReplyInfoDto> userReplyInfoDtoList = new ArrayList<>();

        UserListDto userListDto = new UserListDto();
        UserReplyListDto userReplyListDto = new UserReplyListDto();

        userList.forEach(userEntity ->
                {
                    userEntity.getReplies().forEach(replyEntity ->
                            userReplyInfoDtoList.add(new UserReplyInfoDto(
                                    new BoardServiceDto(replyEntity.getBoard().getId(), replyEntity.getBoard().getTitle(), replyEntity.getBoard().getContent(), replyEntity.getBoard().getSubCategory().getSubCategoryName()),
                                    replyEntity.getCreateDate(),
                                    replyEntity.getContent(),
                                    replyEntity.getId())));

                    userReplyListDto.setUserReplyInfoDtoList(userReplyInfoDtoList);
                    userReplyListDto.setTotal(userReplyInfoDtoList.size());
                    userInfoDtoList.add(new UserInfoDto(
                            userEntity.getId(),
                            userEntity.getRoleType(),
                            userEntity.getNickname(),
                            userEntity.getCreateDate(),
                            userReplyListDto));
                });
        userListDto.setUserInfoDtoList(userInfoDtoList);
        userListDto.setTotal(userInfoDtoList.size());

        return userListDto;
    }

}
