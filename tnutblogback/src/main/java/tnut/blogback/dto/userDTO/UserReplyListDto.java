package tnut.blogback.dto.userDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReplyListDto {
    private List<UserReplyInfoDto> userReplyInfoDtoList;
    private int total;
}
