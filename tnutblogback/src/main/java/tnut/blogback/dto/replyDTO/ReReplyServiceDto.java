package tnut.blogback.dto.replyDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReReplyServiceDto {
    private Long id;
    private String content;
    private String nickname;
    private Timestamp createDate;
}
