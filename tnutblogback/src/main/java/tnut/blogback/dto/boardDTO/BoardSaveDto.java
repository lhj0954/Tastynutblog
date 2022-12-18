package tnut.blogback.dto.boardDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardSaveDto {
    private String title;
    private String content;
    private Long subCategoryId;
}
