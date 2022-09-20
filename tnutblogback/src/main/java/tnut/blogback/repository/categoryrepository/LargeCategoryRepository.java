package tnut.blogback.repository.categoryrepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tnut.blogback.model.category.LargeCategory;

@Repository
public interface LargeCategoryRepository extends JpaRepository<LargeCategory, Long> {
}
