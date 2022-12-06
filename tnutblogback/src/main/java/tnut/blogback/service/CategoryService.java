package tnut.blogback.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tnut.blogback.dto.boardDTO.BoardListDto;
import tnut.blogback.dto.boardDTO.BoardServiceDto;
import tnut.blogback.dto.categoryDto.*;
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
    public LargeCategoryListDto largeCategoryList() {
        List<LargeCategory> largeCategoryList = largeCategoryRepository.findAll();
        LargeCategoryListDto largeCategoryListDto = new LargeCategoryListDto();

        List<LargeCategoryServiceDto> largeCategoryDtoList = new ArrayList<>();
        largeCategoryList.forEach(largeCategory -> largeCategoryDtoList.add(
                new LargeCategoryServiceDto(largeCategory.getId(), largeCategory.getLargeCategoryName())
        ));

        largeCategoryListDto.setLargeCategoryList(largeCategoryDtoList);
        largeCategoryListDto.setTotal(largeCategoryDtoList.size());

        return largeCategoryListDto;
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

        return new LargeCategoryServiceDto();
    }

    @Transactional(readOnly = true)
    public SubCategoryListDto setSubCategories(Long id) {
        LargeCategory largeCategoryEntity = largeCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("없는 대분류 카테고리 입니다."));

        List<SubCategoryServiceDto> subCategoryServiceDtoList = new ArrayList<>();
        SubCategoryListDto subCategoryListDto = new SubCategoryListDto();

        largeCategoryEntity.getSubCategories()
                .forEach(subCategory ->
                {
                    List<BoardServiceDto> boardServiceDtoList = new ArrayList<>();
                    BoardListDto boardListDto = new BoardListDto();
                    subCategory.getBoards().forEach(board ->
                            boardServiceDtoList.add(new BoardServiceDto(board.getId(), board.getTitle(), board.getContent(), board.getSubCategory().getSubCategoryName())));

                    boardListDto.setBoardServiceDtoList(boardServiceDtoList);
                    boardListDto.setTotal(boardServiceDtoList.size());

                    subCategoryServiceDtoList
                            .add(new SubCategoryServiceDto(subCategory.getId(), subCategory.getSubCategoryName(), boardListDto));
                });

        subCategoryListDto.setSubCategoryServiceDtoList(subCategoryServiceDtoList);
        subCategoryListDto.setTotal(subCategoryServiceDtoList.size());

        return subCategoryListDto;
    }

    @Transactional //subCategory 저장
    public SubCategoryServiceDto subCategorySave(SubCategorySaveDto subCategorySaveDto) {
        LargeCategory largeCategoryEntity = largeCategoryRepository.findById(subCategorySaveDto.getLargeCategoryId())
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

        return new SubCategoryServiceDto();
    }

}
