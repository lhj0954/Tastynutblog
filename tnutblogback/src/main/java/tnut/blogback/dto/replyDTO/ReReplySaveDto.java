package tnut.blogback.dto.replyDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReReplySaveDto {
    private Long parentReplyId;
    private Long boardId;
    private String content;
    private String username;
}
