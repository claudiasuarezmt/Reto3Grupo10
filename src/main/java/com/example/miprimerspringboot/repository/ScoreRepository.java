package com.example.miprimerspringboot.repository;

import com.example.miprimerspringboot.entidades.Category;
import com.example.miprimerspringboot.entidades.Score;
import com.example.miprimerspringboot.repository.CRUDRepository.ScoreCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ScoreRepository {
    @Autowired
    private ScoreCRUDRepository scoreCRUDRepository;

    public List<Score> getAll(){
        return (List<Score>) scoreCRUDRepository.findAll();
    }
    public Optional<Score> getById(int id){
        return scoreCRUDRepository.findById(id);
    }
    public Score save(Score sc){
        return scoreCRUDRepository.save(sc);
    }

    public void delete(Score c){
        scoreCRUDRepository.delete(c);
    }
}
