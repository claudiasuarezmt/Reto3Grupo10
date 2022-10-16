package com.example.miprimerspringboot.controller;


import com.example.miprimerspringboot.entidades.Category;
import com.example.miprimerspringboot.entidades.Client;
import com.example.miprimerspringboot.services.ClientService;
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
    public List<Client> getAll(){
        return clientService.getAll();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Client save(@RequestBody Client c){
        return clientService.save(c);
    }

    @GetMapping("/{id}")
    public Optional<Client> getClient(@PathVariable("id") int clientId){
        return clientService.getById(clientId);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Client update(@RequestBody Client u){
        return clientService.update(u);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){
        return clientService.delete(id);
    }
}