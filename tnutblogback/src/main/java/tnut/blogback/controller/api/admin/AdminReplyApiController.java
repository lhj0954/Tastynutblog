package tnut.blogback.controller.api.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.service.ReplyService;

@RestController
public class AdminReplyApiController {
    private final ReplyService replyService;

    @Autowired
    public AdminReplyApiController(ReplyService replyService) {
        this.replyService = replyService;
    }

    @DeleteMapping("/admin/api/reply/{id}") // 관리자가 댓글 삭제
    public ResponseDto<?> replyDelete (@PathVariable Long id) {
        return new ResponseDto<>(HttpStatus.OK.value(), replyService.replyDelete(id));
    }
}
