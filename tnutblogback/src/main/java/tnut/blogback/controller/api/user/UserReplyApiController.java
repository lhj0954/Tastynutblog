package tnut.blogback.controller.api.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import tnut.blogback.config.auth.PrincipalDetails;
import tnut.blogback.dto.replyDTO.ReplySaveRequestDto;
import tnut.blogback.dto.replyDTO.ReplyUpdateDto;
import tnut.blogback.dto.replyDTO.RereplySaveRequestDto;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.service.ReplyService;

@RequiredArgsConstructor
@RestController
public class UserReplyApiController {

    private ReplyService replyService;

    @Autowired
    public UserReplyApiController(ReplyService replyService) {
        this.replyService = replyService;
    }

    @PostMapping("/user/api/reply/save") //댓글 내용 받아서 저장
    public ResponseDto<?> replySave (@RequestBody ReplySaveRequestDto replySaveRequestDto, @AuthenticationPrincipal PrincipalDetails principal) {
        return new ResponseDto<>(HttpStatus.OK.value(), replyService.replySave(replySaveRequestDto, principal.getUser()));
    }

    @PostMapping("/user/api/reReply/save") //대댓글 내용 받아서 저장
    public ResponseDto<?> reReplySave (@RequestBody RereplySaveRequestDto reReplySaveRequestDto, @AuthenticationPrincipal PrincipalDetails principal) {
        return new ResponseDto<>(HttpStatus.OK.value(), replyService.reReplySave(reReplySaveRequestDto, principal.getUser()));
    }

    @DeleteMapping("/user/api/reply/{id}/delete") //댓글 삭제
    public String replyDelete (@PathVariable Long id, @AuthenticationPrincipal PrincipalDetails principal) {
        return replyService.replyDelete(id, principal.getUser());
    }

    @PutMapping("/user/api/reply/{id}/update") // 댓글 수정
    public ResponseDto<?> replyUpdate (@RequestBody ReplyUpdateDto replyUpdateDto, @AuthenticationPrincipal PrincipalDetails principal) {
        return new ResponseDto<>(HttpStatus.OK.value(), replyService.replyUpdate(replyUpdateDto, principal.getUser()));
    }
}
