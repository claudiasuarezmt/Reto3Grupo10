package com.example.miprimerspringboot.services;

import com.example.miprimerspringboot.entidades.Category;
import com.example.miprimerspringboot.entidades.Client;
import com.example.miprimerspringboot.repository.CategoryRepository;
import com.example.miprimerspringboot.repository.ClientRepository;
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

    public Category save(Category c){
        return categoryRepository.save(c);
    }
    public Optional<Category> getById(int id){
        return categoryRepository.getById(id);
    }


}
