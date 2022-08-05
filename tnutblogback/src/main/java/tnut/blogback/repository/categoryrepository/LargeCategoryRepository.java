package tnut.blogback.repository.categoryrepository;

import org.springframework.data.jpa.repository.JpaRepository;
import tnut.blogback.model.category.LargeCategory;

public interface LargeCategoryRepository extends JpaRepository<LargeCategory, Long> {
}
