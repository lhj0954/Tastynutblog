package tnut.blogback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tnut.blogback.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
     User findByUsername(String username);
     boolean existsByNickname(String nickname);
}
