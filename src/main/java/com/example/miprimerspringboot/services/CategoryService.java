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

    public Category save(Category c) {
        if (validateCategory(c)) {
            return categoryRepository.save(c);
        }else{
            return c;
        }
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
                if(validateCategory(oldCat)){
                    return categoryRepository.save(oldCat);
                }else{
                    return u;
                }
            }
        }
        return u;
    }

    public boolean delete(int id) {
        Optional<Category> categ=categoryRepository.getById(id);
        if(categ.isPresent()){
            if(categ.get().getLibs().isEmpty()) {
                categoryRepository.delete(categ.get());
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }

    }
    public boolean validateCategory(Category c){
        if (c.getName().length()<=45 && c.getDescription().length()<=250){
            return true;
        }else{
            return false;
        }
    }
}
