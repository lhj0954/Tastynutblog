package tnut.blogback.dto.replyDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReplyServiceDto {
    private Long id;
    private String content;
    private String nickname;
    private Timestamp createDate;
    private boolean deletable;
    private Long boardId;
    private List<ReReplyServiceDto> reReplyServiceDtoList;
}
