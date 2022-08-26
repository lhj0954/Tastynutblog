package tnut.blogback.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import tnut.blogback.model.Board;
import tnut.blogback.service.BoardService;

import java.util.List;

@RequiredArgsConstructor
@RestController //react와 json객체를 주고 받을 것임
public class IndexController {

    private BoardService boardService;

    @Autowired
    public IndexController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping({"","/"}) //indexPage에 전체 게시물 목록을 넘겨줌
    public List<Board> boardRecentList() {
        return boardService.boardRecentList();
    }
}
