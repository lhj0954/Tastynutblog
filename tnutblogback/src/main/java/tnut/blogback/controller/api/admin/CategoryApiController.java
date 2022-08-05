package tnut.blogback.controller.api.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.dto.SubCategorySaveRequestDto;
import tnut.blogback.model.category.LargeCategory;
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

    @PostMapping("/admin/api/largeCategory/save") //대분류카테고리 저장
    public ResponseDto<?> largeCategorySave (@RequestBody LargeCategory largeCategory) {
        return new ResponseDto<> (HttpStatus.CREATED.value(), categoryService.largeCategorySave(largeCategory));
    }

    @DeleteMapping("/admin/api/largeCategory/{id}/delete") //카테고리 삭제
    public String largeCategoryDelete (@PathVariable Long id) {
        return categoryService.largeCategoryDelete(id);
    }

    @PutMapping("/admin/api/largeCategory/{id}/update") //카테고리 이름 변경
    public ResponseDto<?> largeCategoryUpdate (@PathVariable Long id, @RequestBody LargeCategory largeCategory) {
        return new ResponseDto<> (HttpStatus.OK.value(), categoryService.largeCategoryUpdate(id, largeCategory));
    }

    @PostMapping("/admin/api/subCategory/{largeCategory_id}/save") //소분류카테고리 저장
    public ResponseDto<?> subCategorySave (@RequestBody SubCategorySaveRequestDto subCategorySaveRequestDto) {
        return new ResponseDto<> (HttpStatus.CREATED.value(), categoryService.subCategorySave(subCategorySaveRequestDto));
    }

    @DeleteMapping("/admin/api/subCategory/{id}/delete") //카테고리 삭제
    public String subCategoryDelete (@PathVariable Long id) {
        return categoryService.subCategoryDelete(id);
    }

    @PutMapping("/admin/api/subCategory/{id}/update") //카테고리 이름 변경
    public ResponseDto<?> subCategoryUpdate (@PathVariable Long id, @RequestBody SubCategory subCategory) {
        return new ResponseDto<> (HttpStatus.OK.value(), categoryService.subCategoryUpdate(id, subCategory));
    }
}
