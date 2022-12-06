package tnut.blogback.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tnut.blogback.dto.boardDTO.BoardContentDto;
import tnut.blogback.dto.boardDTO.BoardListDto;
import tnut.blogback.dto.boardDTO.BoardSaveDto;
import tnut.blogback.dto.boardDTO.BoardServiceDto;
import tnut.blogback.dto.replyDTO.ReReplyServiceDto;
import tnut.blogback.dto.replyDTO.ReplyListDto;
import tnut.blogback.dto.replyDTO.ReplyServiceDto;
import tnut.blogback.model.Board;
import tnut.blogback.model.category.SubCategory;
import tnut.blogback.repository.BoardRepository;
import tnut.blogback.repository.categoryrepository.SubCategoryRepository;

import java.util.ArrayList;
import java.util.List;

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
        SubCategory subCategory = subCategoryRepository.findById(boardSaveDto.getSubCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("없는 카테고리 입니다."));

        boardRepository.save(new Board(subCategory, boardSaveDto.getTitle(), boardSaveDto.getContent()));

        return new BoardServiceDto();
    }

    @Transactional(readOnly = true) //글들을 리스트로 받아옴 -> 인덱스 페이지에 넣을 거임 GetMapping
    public BoardListDto boardRecentList() {
        List<Board> boards = boardRepository.findTop15ByOrderByIdDesc();

        List<BoardServiceDto> boardServiceDtoList = new ArrayList<>();
        BoardListDto boardListDto = new BoardListDto();

        boards.forEach(board ->
                {
                    String content;
                    if(board.getContent().length() >= 100) { //앞부분만 간추려서 보내야 함
                        content = board.getContent().substring(0, 99);
                    } else {
                        content = board.getContent();
                    }
                    boardServiceDtoList.add(new BoardServiceDto(
                            board.getId(),
                            board.getTitle(),
                            content,
                            board.getSubCategory().getSubCategoryName()
                    ));
                }
        );


        boardListDto.setBoardServiceDtoList(boardServiceDtoList);
        boardListDto.setTotal(boardServiceDtoList.size());

        return boardListDto;
    }

    @Transactional //게시글 내용보기 GetMapping
    public BoardContentDto boardContent(Long id) {
        Board boardEntity = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 게시글 입니다."));

        List<ReplyServiceDto> replies = new ArrayList<>();
        ReplyListDto replyListDto = new ReplyListDto();

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
                                                    )
                                    )
                            );

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

        replyListDto.setReplies(replies);
        replyListDto.setTotal(replies.size());

        return new BoardContentDto
                (
                        boardEntity.getId(),
                        boardEntity.getTitle(),
                        boardEntity.getContent(),
                        boardEntity.getSubCategory().getSubCategoryName(),
                        replyListDto
                );
    }

    @Transactional
    public BoardServiceDto boardUpdate(Long id, BoardSaveDto boardSaveDto) { //게시글 수정 PutMapping
        Board boardEntity = boardRepository.findById(id) //더티 체킹(DB가 변화를 감지해서 update문 실행)
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 게시글 입니다."));

        SubCategory subCategory = subCategoryRepository.findById(boardSaveDto.getSubCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("없는 카테고리 입니다."));

        boardEntity.setSubCategory(subCategory);
        boardEntity.setTitle(boardSaveDto.getTitle());
        boardEntity.setContent(boardSaveDto.getContent());

        return new BoardServiceDto();
    }

    @Transactional
    public BoardServiceDto boardDelete(Long id) { //게시글 삭제 DeleteMapping
        boardRepository.deleteById(id);

        return new BoardServiceDto();
    }

}
