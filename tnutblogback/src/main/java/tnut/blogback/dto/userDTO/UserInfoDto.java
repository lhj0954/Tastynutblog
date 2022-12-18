package tnut.blogback.dto.userDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tnut.blogback.model.RoleType;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDto {
    private Long id;
    private RoleType roleType;
    private String nickname;
    private Timestamp createDate;
    private UserReplyListDto replies;
}
