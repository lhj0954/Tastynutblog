package tnut.blogback.dto.replyDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReplyListDto {
    private List<ReplyServiceDto> replies;
    private int total;
}
