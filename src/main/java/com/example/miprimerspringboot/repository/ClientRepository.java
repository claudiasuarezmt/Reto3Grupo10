package com.example.miprimerspringboot.repository;

import com.example.miprimerspringboot.entidades.Category;
import com.example.miprimerspringboot.entidades.Client;
import com.example.miprimerspringboot.repository.CRUDRepository.ClientCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ClientRepository {
    @Autowired
    private ClientCRUDRepository clientCRUDRepository;

    public List<Client> getAll(){
        return (List<Client>) clientCRUDRepository.findAll();
    }

    public Client save(Client s){
        return clientCRUDRepository.save(s);
    }

    public Optional<Client> getById(int id){
         return clientCRUDRepository.findById(id);
    }

    public void delete(Client c){
        clientCRUDRepository.delete(c);
    }
}
