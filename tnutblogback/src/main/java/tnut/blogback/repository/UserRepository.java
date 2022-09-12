package tnut.blogback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tnut.blogback.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
     User findByUsername(String username);
     User findByNickname(String nickname);
     boolean existsByNickname(String nickname);
}
