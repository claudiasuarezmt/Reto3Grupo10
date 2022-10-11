package com.example.miprimerspringboot.repository.CRUDRepository;

import com.example.miprimerspringboot.entidades.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryCRUDRepository extends CrudRepository<Category,Integer> {
}
