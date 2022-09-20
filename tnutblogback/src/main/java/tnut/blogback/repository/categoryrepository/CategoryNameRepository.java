package tnut.blogback.repository.categoryrepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tnut.blogback.model.category.CategoryNameList;

@Repository
public interface CategoryNameRepository extends JpaRepository<CategoryNameList, Integer> {
    void deleteCategoryNameListsByLcId(Long id);
    void deleteCategoryNameListsByScId(Long id);
}
