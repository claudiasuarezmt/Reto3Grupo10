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
        if(validateClient(c)){
            return clientRepository.save(c);
        }else{
            return c;
        }

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

                if (u.getPassword()!=null){
                    oldCat.setPassword(u.getPassword());
                }
                if (u.getAge()!=null){
                    oldCat.setAge(u.getAge());
                }
                if(validateClient(oldCat)){
                    return clientRepository.save(oldCat);
                }else{
                    return u;
                }

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
    public boolean validateClient(Client c){
        if(c.getPassword().length()<=45 && c.getName().length()<=250 && Math.round(c.getAge())-c.getAge()==0){
            return true;
        }else{
            return false;
        }
    }


}
