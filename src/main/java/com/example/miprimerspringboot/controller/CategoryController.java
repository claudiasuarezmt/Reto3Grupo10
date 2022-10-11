package com.example.miprimerspringboot.controller;


import com.example.miprimerspringboot.entidades.Category;
import com.example.miprimerspringboot.entidades.Client;
import com.example.miprimerspringboot.services.CategoryService;
import com.example.miprimerspringboot.services.ClientService;
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
    public Category save(@RequestBody Category c){
        return categoryService.save(c);
    }

    @GetMapping("/{id}")
    public Optional<Category> getClient(@PathVariable("id") int categoryId){
        return categoryService.getById(categoryId);
    }
}