package tnut.blogback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tnut.blogback.model.Board;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findTop15ByOrderByIdDesc();
    //List<Board> findAllBySubCategory_Id(Long id); <Tab> 선택시 해당 subCategory와 연관된 boards를 가져오려고 했으나 onClick()지원 안함..
}
