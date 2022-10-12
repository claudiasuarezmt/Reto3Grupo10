package com.example.miprimerspringboot.repository;

import com.example.miprimerspringboot.entidades.Library;
import com.example.miprimerspringboot.repository.CRUDRepository.LibraryCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class LibraryRepository {
    @Autowired
    private LibraryCRUDRepository libraryCRUDRepository;

    public List<Library> getAll(){
        return (List<Library>) libraryCRUDRepository.findAll();
    }
    public Library save(Library lb){
        return libraryCRUDRepository.save(lb);
    }
    public Optional<Library> getById(int idLibrary){
        return libraryCRUDRepository.findById(idLibrary);
    }
    public void delete(Library lb){
        libraryCRUDRepository.delete(lb);
    }


}
