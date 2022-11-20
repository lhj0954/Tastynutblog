package tnut.blogback.dto.categoryDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LargeCategoryServiceDto {
    private Long id;
    private String largeCategoryName;
    //private List<SubCategoryServiceDto> subCategoryServiceDtoList;
}
