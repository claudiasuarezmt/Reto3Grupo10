package com.example.springbootreto3.repository;

import com.example.springbootreto3.entidades.Message;
import com.example.springbootreto3.repository.CRUDRepository.MessageCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MessageRepository {

    @Autowired
    private MessageCRUDRepository messageCRUDRepository;

    public List<Message> getAll(){
         return (List<Message>) messageCRUDRepository.findAll();
    }
    public Optional<Message> getMessage(int id){
        return messageCRUDRepository.findById(id);
    }
    public  Message save(Message m){
        return messageCRUDRepository.save(m);
    }
    public void delete(Message m){
        messageCRUDRepository.delete(m);
    }



}
