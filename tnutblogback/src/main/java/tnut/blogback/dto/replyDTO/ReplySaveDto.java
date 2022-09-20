package tnut.blogback.dto.replyDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReplySaveDto {
    private Long board_id;
    private String content;
}
