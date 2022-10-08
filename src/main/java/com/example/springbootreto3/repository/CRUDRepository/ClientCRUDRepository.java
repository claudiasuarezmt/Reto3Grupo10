package com.example.springbootreto3.repository.CRUDRepository;

import com.example.springbootreto3.entidades.Category;
import com.example.springbootreto3.entidades.Client;
import org.springframework.data.repository.CrudRepository;

public interface ClientCRUDRepository extends CrudRepository<Client,Integer> {
}
