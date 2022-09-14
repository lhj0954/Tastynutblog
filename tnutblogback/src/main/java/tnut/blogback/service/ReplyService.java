package tnut.blogback.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tnut.blogback.dto.replyDTO.ReplySaveRequestDto;
import tnut.blogback.dto.replyDTO.ReplyUpdateDto;
import tnut.blogback.dto.replyDTO.RereplySaveRequestDto;
import tnut.blogback.model.Board;
import tnut.blogback.model.Reply;
import tnut.blogback.model.User;
import tnut.blogback.repository.BoardRepository;
import tnut.blogback.repository.ReplyRepository;

@Service
public class ReplyService {

    private final BoardRepository boardRepository;

    private final ReplyRepository replyRepository;

    public ReplyService(BoardRepository boardRepository, ReplyRepository replyRepository) {
        this.boardRepository = boardRepository;
        this.replyRepository = replyRepository;
    }

    @Transactional
    public Reply replySave(ReplySaveRequestDto replySaveRequestDto, User user) { //postMapping  User는 pincipalDatails에서 가져옴

        Board board = boardRepository.findById(replySaveRequestDto.getBoard_id()) //보드 있는지 확인
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 게시글 입니다."));

        Reply replyEntity = Reply.builder()
                .board(board)
                .user(user)
                .content(replySaveRequestDto.getContent())
                .username(replySaveRequestDto.getUsername())
                .build();

        return replyRepository.save(replyEntity);
    }

    @Transactional
    public Reply reReplySave(RereplySaveRequestDto reReplySaveRequestDto, User user) { //대댓글 User는 pincipalDatails에서 가져옴

        Reply parentReply = replyRepository.findById(reReplySaveRequestDto.getParentReply_id())
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 댓글입니다."));

        Board board = boardRepository.findById(reReplySaveRequestDto.getBoard_id()) //보드 있는지 확인
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 게시글 입니다."));

        Reply replyEntity = Reply.builder()
                .parentReply(parentReply)
                .board(board)
                .user(user)
                .content(reReplySaveRequestDto.getContent())
                .username(reReplySaveRequestDto.getUsername())
                .build();

        return replyRepository.save(replyEntity);
    }

    @Transactional
    public String replyDelete(Long id, User user) { //유저 댓글 삭제 DeleteMapping User는 pincipalDatails에서 가져옴
        Reply replyEntity = replyRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제되거나 권한이 없는 이용자 입니다."));

        if (!replyEntity.getReReplies().isEmpty()) { //자식이 있을경우
            replyEntity.setContent(null); //내용을 비우고
            replyEntity.setDeletable(true); //삭제 가능상태로 업데이트
        } else { //자식이 없을 경우
            replyRepository.deleteById(id); //삭제 대상은 삭제하고
            replyRepository.flush(); //플러쉬 하지 않으면 삭제가 맨 마지막에 DB에서 처리 되기 때문에 부모댓글의 대댓글이 존재한 채로 다음 로직이 먼저 실행
            if (replyEntity.getParentReply() == null) {
                return "success delete!";
            } else {
                if (replyEntity.getParentReply().isDeletable()) {
                    replyDelete(replyEntity.getParentReply().getId(), replyEntity.getParentReply().getUser()); //부모에 대한 삭제도 진행
                }
            }
        }
        return "success delete!";
    }

    @Transactional
    public String replyDelete(Long id) { //관리자 댓글 삭제
        Reply replyEntity = replyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 댓글입니다."));

        if (!replyEntity.getReReplies().isEmpty()) {
            replyEntity.setContent(null);
            replyEntity.setDeletable(true);
        } else {
            replyRepository.deleteById(id);
            replyRepository.flush();
            if (replyEntity.getParentReply() == null) {
                return "success delete!";
            } else {
                if (replyEntity.getParentReply().isDeletable()) {
                    replyDelete(replyEntity.getParentReply().getId());
                }
            }
        }
        return "success delete!";
    }

    @Transactional
    public Reply replyUpdate(ReplyUpdateDto replyUpdateDto, User user) {  //User는 pincipalDatails에서 가져옴
        Reply replyEntity = replyRepository.findByIdAndUser(replyUpdateDto.getId(), user)
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 댓글이거나 권한이 없습니다."));

        replyEntity.setContent(replyUpdateDto.getContent());

        return replyEntity;
    }
}
