package com.example.miprimerspringboot.services;

import com.example.miprimerspringboot.entidades.Category;
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

    public Client update(Client u){
        if (u.getIdClient()!=null){
            Optional<Client> cli=clientRepository.getById(u.getIdClient());
            if (cli.isPresent()){
                Client oldCat=cli.get();
                if (u.getName()!=null){
                    oldCat.setName(u.getName());
                }
                if (u.getEmail()!=null){
                    oldCat.setEmail(u.getEmail());
                }
                if (u.getPassword()!=null){
                    oldCat.setPassword(u.getPassword());
                }
                if (u.getAge()!=null){
                    oldCat.setAge(u.getAge());
                }

                return clientRepository.save(oldCat);
            }
        }
        return u;
    }

    public boolean delete(int id){
        Optional<Client> clien=clientRepository.getById(id);
        if(clien.isPresent()){
            clientRepository.delete(clien.get());
            return true;
        }else{
            return false;
        }

    }


}
