package tnut.blogback.dto.boardDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tnut.blogback.dto.replyDTO.ReplyServiceDto;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardContentDto {
    private Long id;
    private String title;
    private String content;
    private String subCategoryName;
    private List<ReplyServiceDto> replies;
}
