package tnut.blogback.repository.categoryrepository;

import org.springframework.data.jpa.repository.JpaRepository;
import tnut.blogback.model.category.SubCategory;

import java.util.List;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {
}
