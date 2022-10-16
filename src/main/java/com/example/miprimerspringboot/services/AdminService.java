package com.example.miprimerspringboot.services;

import com.example.miprimerspringboot.entidades.Admin;
import com.example.miprimerspringboot.entidades.Category;
import com.example.miprimerspringboot.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAll(){
        return adminRepository.getAll();
    }
    public Optional<Admin> getById(int id){
        return adminRepository.getById(id);
    }
    public Admin save(Admin ad){
        if(validateAdmin(ad)) {
            return adminRepository.save(ad);
        }else{
            return ad;
        }
    }

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin update(Admin u){
        if (u.getId()!=null){
            Optional<Admin> adm=adminRepository.getById(u.getId());
            if (adm.isPresent()){
                Admin oldCat=adm.get();
                if (u.getName()!=null){
                    oldCat.setName(u.getName());
                }
                if (u.getName()!=null){
                    oldCat.setName(u.getName());
                }
                if (u.getEmail()!=null){
                    oldCat.setEmail(u.getEmail());
                }
                if (u.getPassword()!=null){
                    oldCat.setPassword(u.getPassword());
                }
                if(validateAdmin(oldCat)){
                    return adminRepository.save(oldCat);
                }else{
                    return u;
                }
            }
        }
        return u;
    }

    public boolean delete(int id){
        Optional<Admin> adm=adminRepository.getById(id);
        if(adm.isPresent()){
            adminRepository.delete(adm.get());
            return true;
        }else{
            return false;
        }

    }
    public boolean validateAdmin(Admin ad){
        if (ad.getName().length()<=250 && ad.getPassword().length()<=45 && ad.getEmail().length()<=45){
            return true;
        }else{
            return false;
        }
    }
}
