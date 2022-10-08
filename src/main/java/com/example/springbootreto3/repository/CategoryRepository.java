package com.example.springbootreto3.repository;

import com.example.springbootreto3.entidades.Category;
import com.example.springbootreto3.repository.CRUDRepository.CategoryCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CategoryRepository {
    @Autowired
    private CategoryCRUDRepository categoryCRUDRepository;

    public List<Category> getAll(){
        return (List<Category>) categoryCRUDRepository.findAll();

    }
    public Category save (Category ca) {
       return categoryCRUDRepository.save(ca);
    }

    public Optional<Category> getById(int id){
        return categoryCRUDRepository.findById(id);
    }

}
