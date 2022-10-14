package com.example.miprimerspringboot.services;

import com.example.miprimerspringboot.entidades.Category;
import com.example.miprimerspringboot.repository.CategoryRepository;
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

    public Category update(Category u){
        if (u.getId()!=null){
            Optional<Category> cat=categoryRepository.getById(u.getId());
            if (cat.isPresent()){
                Category oldCat=cat.get();
                if (u.getName()!=null){
                    oldCat.setName(u.getName());
                }
                if (u.getDescription()!=null){
                    oldCat.setDescription(u.getDescription());
                }
                return categoryRepository.save(oldCat);
            }
        }
        return u;
    }

    public boolean delete(int id){
        Optional<Category> categ=categoryRepository.getById(id);
        if(categ.isPresent()){
            categoryRepository.delete(categ.get());
            return true;
        }else{
            return false;
        }

    }
}
