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
        if(validateLibrary(lb)){
            return libraryRepository.save(lb);
        }else{
            return lb;
        }
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
                if (u.getTarget()!=null){
                    oldCat.setTarget(u.getTarget());
                }
                if (u.getCapacity()!=null){
                    oldCat.setCapacity(u.getCapacity());
                }
                if (u.getDescription()!=null){
                    oldCat.setDescription(u.getDescription());
                }
                if(validateLibrary(oldCat)){
                    return libraryRepository.save(oldCat);
                }else{
                    return u;
                }
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
    public boolean validateLibrary(Library lb){
        if(lb.getTarget().length()<=45 && lb.getName().length()<=45 && lb.getDescription().length()<=250 && Math.round(lb.getCapacity())-lb.getCapacity()==0 ){
            return true;
        }else{
            return false;
        }
    }
}
