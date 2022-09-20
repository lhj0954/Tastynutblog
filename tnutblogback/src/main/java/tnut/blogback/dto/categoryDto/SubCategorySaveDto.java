package tnut.blogback.dto.categoryDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubCategorySaveDto {
    private Long largeCategory_id;
    private String subCategoryName;
}
