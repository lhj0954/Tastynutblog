package tnut.blogback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tnut.blogback.model.Board;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findTop15ByOrderByIdDesc();
    List<Board> findAllBySubCategory_Id(Long id);
}
