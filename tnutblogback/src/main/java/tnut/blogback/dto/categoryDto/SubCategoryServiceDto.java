package tnut.blogback.dto.categoryDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tnut.blogback.dto.boardDTO.BoardServiceDto;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubCategoryServiceDto {
    private Long id;
    private String subCategoryName;
    private List<BoardServiceDto> boardServiceDtoList;
}
