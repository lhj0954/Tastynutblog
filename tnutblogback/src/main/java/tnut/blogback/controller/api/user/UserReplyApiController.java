package tnut.blogback.controller.api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import tnut.blogback.config.auth.PrincipalDetails;
import tnut.blogback.dto.replyDTO.ReplySaveDto;
import tnut.blogback.dto.replyDTO.ReReplySaveDto;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.service.ReplyService;

@RestController
public class UserReplyApiController {

    private final ReplyService replyService;

    @Autowired
    public UserReplyApiController(ReplyService replyService) {
        this.replyService = replyService;
    }

    @PostMapping("/user/api/reply") //댓글 내용 받아서 저장
    public ResponseDto<?> replySave (@RequestBody ReplySaveDto replySaveRequestDto, @AuthenticationPrincipal PrincipalDetails principal) {
        return new ResponseDto<>(HttpStatus.OK.value(), replyService.replySave(replySaveRequestDto, principal.getUser()));
    }

    @PostMapping("/user/api/re-reply") //대댓글 내용 받아서 저장
    public ResponseDto<?> reReplySave (@RequestBody ReReplySaveDto reReplySaveRequestDto, @AuthenticationPrincipal PrincipalDetails principal) {
        return new ResponseDto<>(HttpStatus.OK.value(), replyService.reReplySave(reReplySaveRequestDto, principal.getUser()));
    }

    @DeleteMapping("/user/api/reply/{id}") //댓글 삭제
    public ResponseDto<?> replyDelete (@PathVariable Long id, @AuthenticationPrincipal PrincipalDetails principal) {
        return new ResponseDto<>(HttpStatus.OK.value(), replyService.replyDelete(id, principal.getUser()));
    }

    @PutMapping("/user/api/reply/{id}")
    public ResponseDto<?> replyUpdate(@PathVariable Long id, @RequestBody ReplySaveDto replySaveDto, @AuthenticationPrincipal PrincipalDetails principal) {
        return new ResponseDto<>(HttpStatus.OK.value(), replyService.replyUpdate(id, replySaveDto, principal.getUser()));
    }
}
