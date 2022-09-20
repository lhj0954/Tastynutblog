package tnut.blogback.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tnut.blogback.dto.boardDTO.BoardServiceDto;
import tnut.blogback.dto.categoryDto.LargeCategoryServiceDto;
import tnut.blogback.dto.categoryDto.LargeCategorySaveDto;
import tnut.blogback.dto.categoryDto.SubCategorySaveDto;
import tnut.blogback.dto.categoryDto.SubCategoryServiceDto;
import tnut.blogback.model.category.CategoryNameList;
import tnut.blogback.model.category.CategoryType;
import tnut.blogback.model.category.LargeCategory;
import tnut.blogback.model.category.SubCategory;
import tnut.blogback.repository.BoardRepository;
import tnut.blogback.repository.categoryrepository.CategoryNameRepository;
import tnut.blogback.repository.categoryrepository.LargeCategoryRepository;
import tnut.blogback.repository.categoryrepository.SubCategoryRepository;

import java.util.ArrayList;
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
    public List<LargeCategoryServiceDto> largeCategoryList () {
        List<LargeCategory> largeCategoryList = largeCategoryRepository.findAll();

        List<LargeCategoryServiceDto> largeCategoryDtoList = new ArrayList<>();
        largeCategoryList.forEach(largeCategory ->
                largeCategoryDtoList.add(new LargeCategoryServiceDto(largeCategory.getId(), largeCategory.getLargeCategoryName())));

        return largeCategoryDtoList;
    }

    @Transactional
    public LargeCategoryServiceDto largeCategorySave (LargeCategorySaveDto largeCategorySaveDto) {
        LargeCategory largeCategoryEntity= LargeCategory.builder() //save할 데이터를 받음
                .largeCategoryName(largeCategorySaveDto.getLargeCategoryName())
                .build();

        LargeCategory largeCategory = largeCategoryRepository.save(largeCategoryEntity); //저장 후 반환

        CategoryNameList categoryNameList = CategoryNameList.builder()
                .lcId(largeCategory.getId())
                .categoryName(largeCategory.getLargeCategoryName())
                .categoryType(CategoryType.LARGE)
                .build();

        categoryNameRepository.save(categoryNameList); //largecategory를 저장하면서 categoryNameList에 값을 저장함

        return new LargeCategoryServiceDto(largeCategory.getId(), largeCategory.getLargeCategoryName());
    }

    @Transactional
    public String largeCategoryDelete (Long id) {

        categoryNameRepository.deleteCategoryNameListsByLcId(id);

        largeCategoryRepository.deleteById(id);

        return "success delete";
    }

    @Transactional
    public LargeCategoryServiceDto largeCategoryUpdate(Long id, LargeCategorySaveDto largeCategorySaveDto) {
        LargeCategory largeCategoryEntity = largeCategoryRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("이미 삭제된 카테고리 입니다."));

        largeCategoryEntity.setLargeCategoryName(largeCategorySaveDto.getLargeCategoryName());

        return new LargeCategoryServiceDto(largeCategoryEntity.getId(), largeCategoryEntity.getLargeCategoryName());
    }

    @Transactional(readOnly = true)
    public List<SubCategoryServiceDto> setSubCategories (Long id) {
        LargeCategory largeCategoryEntity = largeCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("없는 대분류 카테고리 입니다."));

        List<SubCategoryServiceDto> subCategoryServiceDtoList = new ArrayList<>();

        largeCategoryEntity.getSubCategories()
                .forEach(subCategory ->
                        {
                            List<BoardServiceDto> boardServiceDtoList = new ArrayList<>();
                            subCategory.getBoards().forEach(board ->
                                    boardServiceDtoList.add(new BoardServiceDto(board.getId(), board.getTitle())));

                            subCategoryServiceDtoList
                                    .add(new SubCategoryServiceDto(subCategory.getId(), subCategory.getSubCategoryName(), boardServiceDtoList));
                        });

        return subCategoryServiceDtoList;
    }

    @Transactional //subCategory 저장
    public SubCategoryServiceDto subCategorySave (SubCategorySaveDto subCategorySaveDto) {
        LargeCategory largeCategoryEntity = largeCategoryRepository.findById(subCategorySaveDto.getLargeCategory_id())
                .orElseThrow(()-> new IllegalArgumentException("없는 대분류 카테고리 입니다."));

        SubCategory subCategoryEntity = SubCategory.builder()
                .largeCategory(largeCategoryEntity)
                .subCategoryName(subCategorySaveDto.getSubCategoryName())
                .build();

        SubCategory subCategory = subCategoryRepository.save(subCategoryEntity);

        List<BoardServiceDto> boardServiceDtoList = new ArrayList<>();
        subCategory.getBoards().forEach(board ->
                boardServiceDtoList.add(new BoardServiceDto(board.getId(), board.getTitle())));

        CategoryNameList categoryNameList = CategoryNameList.builder() //subCategory를 저장하면서 categoryNameList에 값을 저장함
                .lcId(largeCategoryEntity.getId())
                .scId(subCategoryEntity.getId())
                .categoryName(subCategorySaveDto.getSubCategoryName())
                .categoryType(CategoryType.SUB)
                .build();

        categoryNameRepository.save(categoryNameList);

        return new SubCategoryServiceDto(subCategory.getId(), subCategory.getSubCategoryName(), boardServiceDtoList);
    }

    @Transactional //subCategory delete
    public String subCategoryDelete (Long id) {

        categoryNameRepository.deleteCategoryNameListsByScId(id);

        subCategoryRepository.deleteById(id);
        return "success delete";
    }

    @Transactional //서브 카테고리 이름 바꾸기
    public SubCategoryServiceDto subCategoryUpdate(Long id, SubCategorySaveDto subCategorySaveDto) {
        SubCategory subCategoryEntity = subCategoryRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("이미 삭제된 카테고리 입니다."));

        subCategoryEntity.setSubCategoryName(subCategorySaveDto.getSubCategoryName());

        List<BoardServiceDto> boardServiceDtoList = new ArrayList<>();
        subCategoryEntity.getBoards().forEach(board ->
                boardServiceDtoList.add(new BoardServiceDto(board.getId(), board.getTitle())));

        return new SubCategoryServiceDto(subCategoryEntity.getId(), subCategoryEntity.getSubCategoryName(),boardServiceDtoList);
    }

    @Transactional //categoryNameList 가져오기
    public List<CategoryNameList> categoryNameList() {
        return categoryNameRepository.findAll();
    }

}
