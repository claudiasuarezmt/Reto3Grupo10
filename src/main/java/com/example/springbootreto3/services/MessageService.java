package com.example.springbootreto3.services;

import com.example.springbootreto3.entidades.Message;
import com.example.springbootreto3.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAll(){
        return messageRepository.getAll();
    }
    public Optional<Message> getMessage(int id){
        return messageRepository.getMessage(id);
    }

    public Message save(Message m) {
        if(m.getIdMessage()==null){
            return messageRepository.save(m);
        }else{
            Optional<Message> mt=messageRepository.getMessage(m.getIdMessage());
            if (mt.isPresent()){
                return m;
            }else{
                return messageRepository.save(m);
            }
        }
    }
    public  Message update(Message m){

        if (m.getIdMessage()!=null){
            Optional<Message> mt=messageRepository.getMessage(m.getIdMessage());
            if (mt.isPresent()){
                if (m.getIdMessage()!=null){
                    mt.get().setIdMessage(m.getIdMessage());
                }
                if (m.getIdLibrary()!=null){
                    mt.get().setIdLibrary(m.getIdLibrary());
                }
                if (m.getIdClient()!=null){
                    mt.get().setIdClient(m.getIdClient());
                }
                messageRepository.save(mt.get());
                return mt.get();
            }else {
                return m;

            }
        }else{
            return m;
        }
    }

    public boolean delete(int id){
        boolean flaq=false;
        Optional<Message>m=messageRepository.getMessage(id);
        if (m.isPresent()){
            messageRepository.delete(m.get());
            flaq=true;
        }
        return flaq;
    }

}