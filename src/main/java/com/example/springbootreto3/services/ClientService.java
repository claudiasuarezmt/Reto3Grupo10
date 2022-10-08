package com.example.springbootreto3.services;

import com.example.springbootreto3.entidades.Client;
import com.example.springbootreto3.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll(){
        return clientRepository.getAll();
    }

    public Client save(Client cl){
        return clientRepository.save(cl);
    }
    public Optional<Client>getById(int id){
        return clientRepository.getById(id);
    }
}
