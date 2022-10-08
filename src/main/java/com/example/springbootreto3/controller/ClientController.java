package com.example.springbootreto3.controller;

import com.example.springbootreto3.entidades.Client;
import com.example.springbootreto3.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/all")
    public List<Client>getAll(){
        return clientService.getAll();
    }
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Client save(Client cl){
        return clientService.save(cl);
    }
    @GetMapping("/{id}")
    public Optional<Client>getClient(@PathVariable("id") int clientId){
        return clientService.getById(clientId);
    }
}
