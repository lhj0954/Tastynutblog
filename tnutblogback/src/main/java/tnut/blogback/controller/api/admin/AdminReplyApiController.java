package tnut.blogback.controller.api.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tnut.blogback.service.ReplyService;

@RequiredArgsConstructor
@RestController
public class AdminReplyApiController {

    private ReplyService replyService;

    @Autowired
    public AdminReplyApiController(ReplyService replyService) {
        this.replyService = replyService;
    }

    @DeleteMapping("/admin/api/reply/{id}/delete") // 관리자가 댓글 삭제
    public String replyDelete (@PathVariable Long id) {
        return replyService.replyDelete(id);
    }
}
