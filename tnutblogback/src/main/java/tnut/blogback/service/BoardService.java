package tnut.blogback.service;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tnut.blogback.dto.boardDTO.BoardIndexDto;
import tnut.blogback.dto.boardDTO.BoardSaveDto;
import tnut.blogback.dto.boardDTO.BoardServiceDto;
import tnut.blogback.dto.boardDTO.BoardUpdateDto;
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
    public Board boardSave(BoardSaveDto boardSaveDto) {
        SubCategory subCategory = subCategoryRepository.findById(boardSaveDto.getSubCategory_id())
                .orElseThrow(() -> new IllegalArgumentException("없는 카테고리 입니다."));

        Board board = Board.builder()
                .subCategory(subCategory)
                .title(boardSaveDto.getTitle())
                .content(boardSaveDto.getContent())
                .build();

        return boardRepository.save(board);
    }

    @Transactional(readOnly = true) //글들을 리스트로 받아옴 -> 인덱스 페이지에 넣을 거임 GetMapping
    public List<BoardIndexDto> boardRecentList() {
        List<Board> boards = boardRepository.findTop15ByOrderByIdDesc();

        List<BoardIndexDto> boardIndexDtoList = new ArrayList<>();

        boards.forEach(board -> boardIndexDtoList
                .add(new BoardIndexDto(board.getId(), board.getTitle(), board.getContent(), board.getSubCategory().getSubCategoryName())));

        return boardIndexDtoList;
    }

    @Transactional //게시글 내용보기 GetMapping
    public Board boardContent(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 게시글 입니다."));

        board.getReplies().forEach(reply ->  Hibernate.initialize(reply.getReReplies())); //reply, reReply 프록시 초기화
        return board;
    }

    @Transactional
    public BoardUpdateDto boardUpdate(Long id, BoardSaveDto boardSaveDto) { //게시글 수정 PutMapping
        Board boardEntity = boardRepository.findById(id) //더티 체킹(DB가 변화를 감지해서 update문 실행)
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 게시글 입니다."));

        SubCategory subCategory = subCategoryRepository.findById(boardSaveDto.getSubCategory_id())
                .orElseThrow(() -> new IllegalArgumentException("없는 카테고리 입니다."));

        boardEntity.setSubCategory(subCategory);
        boardEntity.setTitle(boardSaveDto.getTitle());
        boardEntity.setContent(boardSaveDto.getContent());

        return new BoardUpdateDto("update success");
    }

    @Transactional
    public String boardDelete(Long id) { //게시글 삭제 DeleteMapping
        boardRepository.deleteById(id);
        return "success delete!";
    }

}
