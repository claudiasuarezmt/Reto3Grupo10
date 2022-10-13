package com.example.miprimerspringboot.repository;

import com.example.miprimerspringboot.entidades.Admin;
import com.example.miprimerspringboot.repository.CRUDRepository.AdminCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class AdminRepository {
    @Autowired
    private AdminCRUDRepository adminCRUDRepository;
    public List<Admin> getAll(){
        return (List<Admin>)adminCRUDRepository.findAll();
    }
    public Optional<Admin> getById(int id){
        return adminCRUDRepository.findById(id);
    }

    public Admin save(Admin ad){
        return adminCRUDRepository.save(ad);
    }
    public void delete(Admin ad){
         adminCRUDRepository.delete(ad);
    }

    public AdminRepository() {
    }

}
