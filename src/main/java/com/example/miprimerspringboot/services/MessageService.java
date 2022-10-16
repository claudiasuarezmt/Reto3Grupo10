package com.example.miprimerspringboot.services;

import com.example.miprimerspringboot.entidades.Message;
import com.example.miprimerspringboot.repository.MessageRepository;
import org.jetbrains.annotations.NotNull;
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
            if(validateMessage(m)) {
                return messageRepository.save(m);
            }else{
                return m;
            }
        }else{
            Optional<Message> mt=messageRepository.getMessage(m.getIdMessage());
            if (mt.isPresent()){
                return m;
            }else{
                if(validateMessage(m)) {
                    return messageRepository.save(m);
                }else{
                    return m;
                }
            }
        }
    }
    public  Message update(@NotNull Message m){

        if (m.getIdMessage()!=null){
            Optional<Message> mt=messageRepository.getMessage(m.getIdMessage());
            if (mt.isPresent()){

                if (m.getMessageText()!=null){
                    mt.get().setMessageText(m.getMessageText());
                }
                if (m.getClient()!=null){
                    mt.get().setClient(m.getClient());
                }
                if (validateMessage(mt.get())){
                    messageRepository.save(mt.get());
                }else {
                    return m;
                }
            }else {
                return m;

            }
        }else{
            return m;
        }
        return m;
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
    public boolean validateMessage(Message m){
        if(m.getMessageText().length()<=250){
            return true;
        }else{
            return false;
        }
    }
}