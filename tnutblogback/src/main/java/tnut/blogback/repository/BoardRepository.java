package tnut.blogback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tnut.blogback.model.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
