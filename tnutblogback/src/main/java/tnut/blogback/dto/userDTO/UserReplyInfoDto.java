package tnut.blogback.dto.userDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tnut.blogback.dto.boardDTO.BoardServiceDto;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserReplyInfoDto {
    private BoardServiceDto boardServiceDto;
    private Timestamp createDate;
    private String content;
    private Long id;
}
