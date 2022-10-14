package com.example.miprimerspringboot.services;

import com.example.miprimerspringboot.entidades.Category;
import com.example.miprimerspringboot.entidades.Library;
import com.example.miprimerspringboot.repository.LibraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibraryService {
    @Autowired
    private LibraryRepository libraryRepository;

    public List<Library> getAll(){
        return (List<Library>)libraryRepository.getAll();
    }
    public Library save(Library lb){

        return libraryRepository.save(lb);
    }
    public Optional<Library> getById(int idLibrary){
        return libraryRepository.getById(idLibrary);
    }
    public Library update(Library u){
        if (u.getId()!=null){
            Optional<Library> lib=libraryRepository.getById(u.getId());
            if (lib.isPresent()){
                Library oldCat=lib.get();
                if (u.getName()!=null){
                    oldCat.setName(u.getName());
                }
                if (u.getDescription()!=null){
                    oldCat.setDescription(u.getDescription());
                }
                return libraryRepository.save(oldCat);
            }
        }
        return u;
    }

    public boolean delete(int id){
        Optional<Library> libr=libraryRepository.getById(id);
        if(libr.isPresent()){
            libraryRepository.delete(libr.get());
            return true;
        }else{
            return false;
        }

    }
}
