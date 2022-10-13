package com.example.miprimerspringboot.controller;

import com.example.miprimerspringboot.entidades.Admin;
import com.example.miprimerspringboot.services.AdminService;
import com.example.miprimerspringboot.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @GetMapping("/all")
    public List<Admin> getAll(){
        return adminService.getAll();
    }
    @GetMapping("/{id}")
    public Optional<Admin> getById(@PathVariable("id") int idAdmin){
        return adminService.getById(idAdmin);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Admin save(@RequestBody Admin ad){
        return adminService.save(ad);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public  boolean delete(@PathVariable("id")int id){
        return adminService.deleteAdmin(id);
    }
}
