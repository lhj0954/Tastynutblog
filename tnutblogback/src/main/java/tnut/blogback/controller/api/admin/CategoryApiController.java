package tnut.blogback.controller.api.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.dto.categoryDto.LargeCategorySaveDto;
import tnut.blogback.dto.categoryDto.SubCategorySaveDto;
import tnut.blogback.model.category.SubCategory;
import tnut.blogback.service.CategoryService;

@RequiredArgsConstructor
@RestController
public class CategoryApiController {

    private CategoryService categoryService;

    @Autowired
    public CategoryApiController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/admin/api/large-category") //대분류카테고리 저장
    public ResponseDto<?> largeCategorySave (@RequestBody LargeCategorySaveDto largeCategorySaveDto) {
        return new ResponseDto<> (HttpStatus.CREATED.value(), categoryService.largeCategorySave(largeCategorySaveDto));
    }

    @DeleteMapping("/admin/api/large-category/{id}") //카테고리 삭제
    public ResponseDto<?> largeCategoryDelete (@PathVariable Long id) {
        return new ResponseDto<>(HttpStatus.OK.value(), categoryService.largeCategoryDelete(id));
    }

    @PutMapping("/admin/api/large-category/{id}") //카테고리 이름 변경
    public ResponseDto<?> largeCategoryUpdate (@PathVariable Long id, @RequestBody LargeCategorySaveDto largeCategorySaveDto) {
        return new ResponseDto<> (HttpStatus.OK.value(), categoryService.largeCategoryUpdate(id, largeCategorySaveDto));
    }

    @PostMapping("/admin/api/sub-category/{largeCategoryId}") //소분류카테고리 저장
    public ResponseDto<?> subCategorySave (@RequestBody SubCategorySaveDto subCategorySaveDto) {
        return new ResponseDto<> (HttpStatus.CREATED.value(), categoryService.subCategorySave(subCategorySaveDto));
    }

    @DeleteMapping("/admin/api/sub-category/{id}") //카테고리 삭제
    public ResponseDto<?> subCategoryDelete (@PathVariable Long id) {
        return new ResponseDto<>(HttpStatus.OK.value(), categoryService.subCategoryDelete(id));
    }

    @PutMapping("/admin/api/sub-category/{id}") //카테고리 이름 변경
    public ResponseDto<?> subCategoryUpdate (@PathVariable Long id, @RequestBody SubCategorySaveDto subCategorySaveDto) {
        return new ResponseDto<> (HttpStatus.OK.value(), categoryService.subCategoryUpdate(id, subCategorySaveDto));
    }
}
