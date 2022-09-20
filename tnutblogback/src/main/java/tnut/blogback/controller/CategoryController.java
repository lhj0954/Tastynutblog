package tnut.blogback.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.service.CategoryService;

@RequiredArgsConstructor
@RestController
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/category") //-> 사이드 바
    public ResponseDto<?> categoryPage () {
        return new ResponseDto<> (HttpStatus.OK.value(), categoryService.largeCategoryList());
    }

    @GetMapping("/categoryNameList")
    public ResponseDto<?> categoryNameList () {
        return new ResponseDto<> (HttpStatus.OK.value(), categoryService.categoryNameList());
    }

    @GetMapping("/sideBar/{largeCategory_id}/subCategories")
    public ResponseDto<?> subCategories (@PathVariable Long largeCategory_id) {
        return new ResponseDto<>(HttpStatus.OK.value(), categoryService.setSubCategories(largeCategory_id));
    }

}
