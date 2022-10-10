package com.example.springbootreto3.services;

import com.example.springbootreto3.entidades.Library;
import com.example.springbootreto3.repository.LibraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibraryService {
    @Autowired
    private LibraryRepository libraryRepository;

    public List<Library> getAll(){
        return libraryRepository.getAll();
    }
    public Library save(Library lb){

        return libraryRepository.save(lb);
    }
    public Optional<Library> getById(int idLibrary){
        return libraryRepository.getById(idLibrary);
    }
}
