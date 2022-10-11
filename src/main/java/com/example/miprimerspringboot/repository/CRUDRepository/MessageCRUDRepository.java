package com.example.miprimerspringboot.repository.CRUDRepository;

import com.example.miprimerspringboot.entidades.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageCRUDRepository extends CrudRepository<Message,Integer> {
}
