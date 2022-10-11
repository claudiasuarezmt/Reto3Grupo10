package com.example.miprimerspringboot.services;

import com.example.miprimerspringboot.entidades.Client;
import com.example.miprimerspringboot.repository.ClientRepository;
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

    public Client save(Client c){
        return clientRepository.save(c);
    }
    public Optional<Client> getById(int id){
        return clientRepository.getById(id);
    }


}
