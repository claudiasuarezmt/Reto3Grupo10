package com.example.springbootreto3.controller;

import com.example.springbootreto3.entidades.Category;
import com.example.springbootreto3.entidades.Client;
import com.example.springbootreto3.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public List<Category> getAll(){
        return categoryService.getAll();
    }
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Category save(Category ca){
        return categoryService.save(ca);
    }
    @GetMapping("/{id}")
    public Optional<Category> getCategory(@PathVariable("id") int categoryId){
        return categoryService.getById(categoryId);
    }
}
