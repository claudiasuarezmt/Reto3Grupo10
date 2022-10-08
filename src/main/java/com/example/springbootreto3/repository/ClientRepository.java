package com.example.springbootreto3.repository;

import com.example.springbootreto3.entidades.Client;
import com.example.springbootreto3.repository.CRUDRepository.ClientCRUDRepository;
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
    public Client save (Client cl) {
       return clientCRUDRepository.save(cl);
    }
    public Optional<Client> getById(int id){
        return clientCRUDRepository.findById(id);
    }
}
