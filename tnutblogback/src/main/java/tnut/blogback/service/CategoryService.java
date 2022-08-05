package tnut.blogback.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tnut.blogback.dto.SubCategorySaveRequestDto;
import tnut.blogback.model.category.CategoryNameList;
import tnut.blogback.model.category.CategoryType;
import tnut.blogback.model.category.LargeCategory;
import tnut.blogback.model.category.SubCategory;
import tnut.blogback.repository.categoryrepository.CategoryNameRepository;
import tnut.blogback.repository.categoryrepository.LargeCategoryRepository;
import tnut.blogback.repository.categoryrepository.SubCategoryRepository;

import java.util.List;

@Service
public class CategoryService {

    private final LargeCategoryRepository largeCategoryRepository;

    private final SubCategoryRepository subCategoryRepository;

    private final CategoryNameRepository categoryNameRepository;

    public CategoryService(LargeCategoryRepository largeCategoryRepository, SubCategoryRepository subCategoryRepository, CategoryNameRepository categoryNameRepository) {
        this.largeCategoryRepository = largeCategoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.categoryNameRepository = categoryNameRepository;
    }

    @Transactional(readOnly = true)
    public List<LargeCategory> largeCategoryList () {
        return largeCategoryRepository.findAll();
    }

    @Transactional
    public LargeCategory largeCategorySave (LargeCategory largeCategory) {
        LargeCategory largeCategoryEntity= largeCategoryRepository.save(largeCategory);

        CategoryNameList categoryNameList = CategoryNameList.builder() //largecategory를 저장하면서 categoryNameList에 값을 저장함
                .lcId(largeCategory.getId())
                .categoryName(largeCategoryEntity.getLargeCategoryName())
                .categoryType(CategoryType.LARGE)
                .build();

        categoryNameRepository.save(categoryNameList);

        return largeCategoryEntity;
    }

    @Transactional
    public String largeCategoryDelete (Long id) {

        categoryNameRepository.deleteCategoryNameListsByLcId(id);

        largeCategoryRepository.deleteById(id);

        return "success delete";
    }

    @Transactional
    public LargeCategory largeCategoryUpdate(Long id, LargeCategory largeCategory) {
        LargeCategory largeCategoryEntity = largeCategoryRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("이미 삭제된 카테고리 입니다."));
        largeCategoryEntity.setLargeCategoryName(largeCategory.getLargeCategoryName());
        return largeCategoryEntity;
    }

    @Transactional //subCategory 저장
    public SubCategory subCategorySave (SubCategorySaveRequestDto subCategorySaveRequestDto) {
        LargeCategory largeCategory = largeCategoryRepository.findById(subCategorySaveRequestDto.getLargeCategory_id())
                .orElseThrow(()-> new IllegalArgumentException("없는 대분류 카테고리 입니다."));

        SubCategory subCategory = SubCategory.builder()
                .largeCategory(largeCategory)
                .subCategoryName(subCategorySaveRequestDto.getSubCategoryName())
                .build();

        SubCategory subCategoryEntity = subCategoryRepository.save(subCategory);

        CategoryNameList categoryNameList = CategoryNameList.builder() //subCategory를 저장하면서 categoryNameList에 값을 저장함
                .lcId(largeCategory.getId())
                .scId(subCategoryEntity.getId())
                .categoryName(subCategorySaveRequestDto.getSubCategoryName())
                .categoryType(CategoryType.SUB)
                .build();

        categoryNameRepository.save(categoryNameList);

        return subCategoryEntity;
    }

    @Transactional //subCategory delete
    public String subCategoryDelete (Long id) {

        categoryNameRepository.deleteCategoryNameListsByScId(id);

        subCategoryRepository.deleteById(id);
        return "success delete";
    }

    @Transactional //서브 카테고리 이름 바꾸기
    public SubCategory subCategoryUpdate(Long id, SubCategory subCategory) {
        SubCategory subCategoryEntity = subCategoryRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("이미 삭제된 카테고리 입니다."));
        subCategoryEntity.setSubCategoryName(subCategory.getSubCategoryName());
        return subCategoryEntity;
    }

    @Transactional //categoryNameList 가져오기
    public List<CategoryNameList> categoryNameList() {
        return categoryNameRepository.findAll();
    }

}
