package tnut.blogback.dto.boardDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardListDto {
    private List<BoardServiceDto> boardServiceDtoList = new ArrayList<>();
    private int total;
}
