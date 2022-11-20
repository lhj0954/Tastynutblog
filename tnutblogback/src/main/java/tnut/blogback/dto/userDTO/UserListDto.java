package tnut.blogback.dto.userDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserListDto {
    private List<UserInfoDto> userInfoDtoList;
    private int total;
}
