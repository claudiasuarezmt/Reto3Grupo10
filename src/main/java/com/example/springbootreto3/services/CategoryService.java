package com.example.springbootreto3.services;

import com.example.springbootreto3.entidades.Category;
import com.example.springbootreto3.entidades.Client;
import com.example.springbootreto3.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAll(){
        return categoryRepository.getAll();
    }

    public Category save(Category ca){
        return categoryRepository.save(ca);
    }
    public Optional<Category> getById(int id){
        return categoryRepository.getById(id);
    }
}
