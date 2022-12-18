package tnut.blogback.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import tnut.blogback.dto.ResponseDto;
import tnut.blogback.service.CategoryService;

@RestController
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/category")
    public ResponseDto<?> categoryPage () {
        return new ResponseDto<> (HttpStatus.OK.value(), categoryService.largeCategoryList());
    }

    @GetMapping("/side-bar/sub-categories/{largeCategoryId}")
    public ResponseDto<?> subCategories (@PathVariable Long largeCategoryId) {
        return new ResponseDto<>(HttpStatus.OK.value(), categoryService.setSubCategories(largeCategoryId));
    }

}
