package tnut.blogback.repository.categoryrepository;

import org.springframework.data.jpa.repository.JpaRepository;
import tnut.blogback.model.category.CategoryNameList;

public interface CategoryNameRepository extends JpaRepository<CategoryNameList, Integer> {
    void deleteCategoryNameListsByLcId(Long id);

    void deleteCategoryNameListsByScId(Long id);
}
