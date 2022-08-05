package tnut.blogback.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.service.BoardService;

@RequiredArgsConstructor
@RestController //react와 json객체를 주고 받을 것임
public class BoardController {

    private BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping("/board/{id}") //id로부터 게시글 data를 넘겨줌 page/board/content
    public ResponseDto<?> boardContent(@PathVariable Long id) {
        return new ResponseDto<>(HttpStatus.OK.value(), boardService.boardContent(id));
    }
}
