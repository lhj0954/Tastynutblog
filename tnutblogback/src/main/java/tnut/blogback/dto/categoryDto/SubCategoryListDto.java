package tnut.blogback.dto.categoryDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubCategoryListDto {
    private List<SubCategoryServiceDto> subCategoryServiceDtoList;
    private int total;
}
