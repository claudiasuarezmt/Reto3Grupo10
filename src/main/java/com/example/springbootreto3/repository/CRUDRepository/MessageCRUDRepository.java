package com.example.springbootreto3.repository.CRUDRepository;

import com.example.springbootreto3.entidades.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageCRUDRepository extends CrudRepository<Message,Integer> {
}
