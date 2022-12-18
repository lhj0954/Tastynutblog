package tnut.blogback.dto.categoryDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tnut.blogback.dto.boardDTO.BoardListDto;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubCategoryServiceDto {
    private Long id;
    private String subCategoryName;
    private BoardListDto boardListDto;
}
