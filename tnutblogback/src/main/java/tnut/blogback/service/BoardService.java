package tnut.blogback.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tnut.blogback.dto.boardDTO.BoardContentDto;
import tnut.blogback.dto.boardDTO.BoardSaveDto;
import tnut.blogback.dto.boardDTO.BoardServiceDto;
import tnut.blogback.dto.replyDTO.ReReplyServiceDto;
import tnut.blogback.dto.replyDTO.ReplyServiceDto;
import tnut.blogback.model.Board;
import tnut.blogback.model.category.SubCategory;
import tnut.blogback.repository.BoardRepository;
import tnut.blogback.repository.categoryrepository.SubCategoryRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class BoardService { //게시글 작성(save), 삭제, 수정, 내용, 글 목록 불러오기         댓글 작성, 삭제, 수정

    public final BoardRepository boardRepository;

    private final SubCategoryRepository subCategoryRepository;

    public BoardService(BoardRepository boardRepository, SubCategoryRepository subCategoryRepository) {
        this.boardRepository = boardRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    @Transactional //게시글 저장 PostMapping
    public BoardServiceDto boardSave(BoardSaveDto boardSaveDto) {
        SubCategory subCategory = subCategoryRepository.findById(boardSaveDto.getSubCategory_id())
                .orElseThrow(() -> new IllegalArgumentException("없는 카테고리 입니다."));

        Board boardEntity = boardRepository.save(new Board(subCategory, boardSaveDto.getTitle(), boardSaveDto.getContent()));

        return new BoardServiceDto(boardEntity.getId(), boardEntity.getTitle());
    }

    @Transactional(readOnly = true) //글들을 리스트로 받아옴 -> 인덱스 페이지에 넣을 거임 GetMapping
    public List<BoardContentDto> boardRecentList() {
        List<Board> boards = boardRepository.findTop15ByOrderByIdDesc();

        List<BoardContentDto> boardContentDtoList = new ArrayList<>();
        List<ReplyServiceDto> replies = new ArrayList<>();

        boards.forEach(board -> boardContentDtoList
                .add(new BoardContentDto(
                        board.getId(),
                        board.getTitle(),
                        board.getContent(),
                        board.getSubCategory().getSubCategoryName(),
                        replies
                )));

        return boardContentDtoList;
    }

    @Transactional //게시글 내용보기 GetMapping
    public BoardContentDto boardContent(Long id) {
        Board boardEntity = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 게시글 입니다."));

        List<ReplyServiceDto> replies = new ArrayList<>();

        boardEntity.getReplies()
                .stream().filter(reply -> reply.getParentReply() == null)//대댓글 방지
                .forEach(reply -> {

                    List<ReReplyServiceDto> reReplies = new ArrayList<>();

                    reply.getReReplies()
                            .forEach(reReply ->
                                    reReplies.add(
                                            new ReReplyServiceDto
                                                    (
                                                            reReply.getId(),
                                                            reReply.getContent(),
                                                            reReply.getUser().getNickname(),
                                                            reReply.getCreateDate()
                                                    )));
                    replies.add(
                            new ReplyServiceDto
                                    (
                                            reply.getId(),
                                            reply.getContent(),
                                            reply.getUser().getNickname(),
                                            reply.getCreateDate(),
                                            reply.isDeletable(),
                                            reply.getBoard().getId(),
                                            reReplies
                                    )
                    );
                });

        return new BoardContentDto
                (
                        boardEntity.getId(),
                        boardEntity.getTitle(),
                        boardEntity.getContent(),
                        boardEntity.getSubCategory().getSubCategoryName(),
                        replies
                );
    }

    @Transactional
    public BoardServiceDto boardUpdate(Long id, BoardSaveDto boardSaveDto) { //게시글 수정 PutMapping
        Board boardEntity = boardRepository.findById(id) //더티 체킹(DB가 변화를 감지해서 update문 실행)
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 게시글 입니다."));

        SubCategory subCategory = subCategoryRepository.findById(boardSaveDto.getSubCategory_id())
                .orElseThrow(() -> new IllegalArgumentException("없는 카테고리 입니다."));

        boardEntity.setSubCategory(subCategory);
        boardEntity.setTitle(boardSaveDto.getTitle());
        boardEntity.setContent(boardSaveDto.getContent());

        return new BoardServiceDto(boardEntity.getId(), boardEntity.getTitle());
    }

    @Transactional
    public BoardServiceDto boardDelete(Long id) { //게시글 삭제 DeleteMapping
        boardRepository.deleteById(id);

        return new BoardServiceDto();
    }

}
