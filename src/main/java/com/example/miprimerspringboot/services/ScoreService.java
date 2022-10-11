package com.example.miprimerspringboot.services;

import com.example.miprimerspringboot.entidades.Score;
import com.example.miprimerspringboot.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll(){
        return scoreRepository.getAll();
    }

    public Optional<Score> getById(int id){
        return scoreRepository.getById(id);
    }
    public Score save(Score sc){
        return scoreRepository.save(sc);
    }

}
