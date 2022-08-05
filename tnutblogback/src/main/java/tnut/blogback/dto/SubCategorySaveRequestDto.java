package tnut.blogback.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubCategorySaveRequestDto {
    private Long largeCategory_id;
    private String subCategoryName;
}
