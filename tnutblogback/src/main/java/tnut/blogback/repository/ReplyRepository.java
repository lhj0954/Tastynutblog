package tnut.blogback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tnut.blogback.model.Reply;
import tnut.blogback.model.User;

import java.util.List;
import java.util.Optional;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
    Optional<Reply> findByIdAndUser(Long id, User user);
}
