package tnut.blogback.dto.boardDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardServiceDto {
    private Long id;
    private String title;
}
