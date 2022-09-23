package tnut.blogback.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tnut.blogback.dto.boardDTO.BoardServiceDto;
import tnut.blogback.dto.categoryDto.LargeCategoryServiceDto;
import tnut.blogback.dto.categoryDto.LargeCategorySaveDto;
import tnut.blogback.dto.categoryDto.SubCategorySaveDto;
import tnut.blogback.dto.categoryDto.SubCategoryServiceDto;
import tnut.blogback.model.category.LargeCategory;
import tnut.blogback.model.category.SubCategory;
import tnut.blogback.repository.categoryrepository.LargeCategoryRepository;
import tnut.blogback.repository.categoryrepository.SubCategoryRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    private final LargeCategoryRepository largeCategoryRepository;

    private final SubCategoryRepository subCategoryRepository;

    public CategoryService(LargeCategoryRepository largeCategoryRepository, SubCategoryRepository subCategoryRepository) {
        this.largeCategoryRepository = largeCategoryRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    @Transactional(readOnly = true)
    public List<LargeCategoryServiceDto> largeCategoryList() {
        List<LargeCategory> largeCategoryList = largeCategoryRepository.findAll();

        List<LargeCategoryServiceDto> largeCategoryDtoList = new ArrayList<>();
        largeCategoryList.forEach(largeCategory -> {
            List<SubCategoryServiceDto> subCategoryServiceDtoList = new ArrayList<>();
            List<BoardServiceDto> boardServiceDtoList = new ArrayList<>();

            largeCategory.getSubCategories().forEach(subCategory ->
                    subCategoryServiceDtoList.add
                            (
                                    new SubCategoryServiceDto
                                            (
                                                    subCategory.getId(),
                                                    subCategory.getSubCategoryName(),
                                                    boardServiceDtoList))
            );

            largeCategoryDtoList.add(
                    new LargeCategoryServiceDto
                            (largeCategory.getId(), largeCategory.getLargeCategoryName(), subCategoryServiceDtoList)
            );
        });

        return largeCategoryDtoList;
    }

    @Transactional
    public LargeCategoryServiceDto largeCategorySave(LargeCategorySaveDto largeCategorySaveDto) {
        LargeCategory largeCategoryEntity = LargeCategory.builder() //save할 데이터를 받음
                .largeCategoryName(largeCategorySaveDto.getLargeCategoryName())
                .build();

        largeCategoryRepository.save(largeCategoryEntity); //저장 후 반환

        return new LargeCategoryServiceDto();
    }

    @Transactional
    public LargeCategoryServiceDto largeCategoryDelete(Long id) {

        largeCategoryRepository.deleteById(id);

        return new LargeCategoryServiceDto();
    }

    @Transactional
    public LargeCategoryServiceDto largeCategoryUpdate(Long id, LargeCategorySaveDto largeCategorySaveDto) {
        LargeCategory largeCategoryEntity = largeCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 카테고리 입니다."));

        largeCategoryEntity.setLargeCategoryName(largeCategorySaveDto.getLargeCategoryName());

        List<SubCategoryServiceDto> subCategoryServiceDtoList = new ArrayList<>();

        return new LargeCategoryServiceDto
                (
                        largeCategoryEntity.getId(),
                        largeCategoryEntity.getLargeCategoryName(),
                        subCategoryServiceDtoList
                );
    }

    @Transactional(readOnly = true)
    public List<SubCategoryServiceDto> setSubCategories(Long id) {
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
    public SubCategoryServiceDto subCategorySave(SubCategorySaveDto subCategorySaveDto) {
        LargeCategory largeCategoryEntity = largeCategoryRepository.findById(subCategorySaveDto.getLargeCategory_id())
                .orElseThrow(() -> new IllegalArgumentException("없는 대분류 카테고리 입니다."));

        SubCategory subCategoryEntity = SubCategory.builder()
                .largeCategory(largeCategoryEntity)
                .subCategoryName(subCategorySaveDto.getSubCategoryName())
                .build();

        subCategoryRepository.save(subCategoryEntity);

        return new SubCategoryServiceDto();
    }

    @Transactional //subCategory delete
    public SubCategoryServiceDto subCategoryDelete(Long id) {

        subCategoryRepository.deleteById(id);

        return new SubCategoryServiceDto();
    }

    @Transactional //서브 카테고리 이름 바꾸기
    public SubCategoryServiceDto subCategoryUpdate(Long id, SubCategorySaveDto subCategorySaveDto) {
        SubCategory subCategoryEntity = subCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("이미 삭제된 카테고리 입니다."));

        subCategoryEntity.setSubCategoryName(subCategorySaveDto.getSubCategoryName());

        List<BoardServiceDto> boardServiceDtoList = new ArrayList<>();
        subCategoryEntity.getBoards().forEach(board ->
                boardServiceDtoList.add(new BoardServiceDto(board.getId(), board.getTitle())));

        return new SubCategoryServiceDto(subCategoryEntity.getId(), subCategoryEntity.getSubCategoryName(), boardServiceDtoList);
    }

}
