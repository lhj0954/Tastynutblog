package tnut.blogback.controller.api.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tnut.blogback.dto.boardDTO.BoardSaveDto;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.dto.boardDTO.BoardServiceDto;
import tnut.blogback.model.Board;
import tnut.blogback.service.BoardService;

@RequiredArgsConstructor
@RestController
public class BoardApiController { //게시글 작성(save), 삭제, 수정

    private BoardService boardService;

    @Autowired
    public BoardApiController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping("/admin/api/board/save") //board의 내용을 입력받아서 저장하고 반환
    public ResponseDto<?> boardSave (@RequestBody BoardSaveDto boardSaveDto) {
        return new ResponseDto<>(HttpStatus.CREATED.value(), boardService.boardSave(boardSaveDto));
    }

    @PutMapping("/admin/api/board/{id}/update") //저장된 board의 내용을 수정하고 반환
    public ResponseDto<?> boardUpdate (@PathVariable Long id, @RequestBody BoardSaveDto boardSaveDto) {
        return new ResponseDto<>(HttpStatus.OK.value(), boardService.boardUpdate(id, boardSaveDto));
    }

    @DeleteMapping("/admin/api/board/{id}/delete") //저장된 board 삭제
    public ResponseDto<?> boardDelete (@PathVariable Long id) {
        return new ResponseDto<>(HttpStatus.OK.value(), boardService.boardDelete(id));
    }
}
