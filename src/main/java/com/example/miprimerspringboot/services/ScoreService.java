package com.example.miprimerspringboot.services;

import com.example.miprimerspringboot.entidades.Category;
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
        if(validateScore(sc)) {
            return scoreRepository.save(sc);
        }else{
            return sc;
        }


    }

    public Score update(Score u){
        if (u.getIdScore()!=null){
            Optional<Score> sco=scoreRepository.getById(u.getIdScore());
            if (sco.isPresent()){
                Score oldCat=sco.get();
                if (u.getScore()!=null){
                    oldCat.setScore(u.getScore());
                }
                if(validateScore(oldCat)){
                    return scoreRepository.save(oldCat);
                }else{
                    return u;
                }


            }
        }
        return u;
    }

    public boolean delete(int id){
        Optional<Score> scre=scoreRepository.getById(id);
        if(scre.isPresent()){
            scoreRepository.delete(scre.get());
            return true;
        }else{
            return false;
        }

    }
    public boolean validateScore(Score sc){
        if( Math.round(sc.getScore()-sc.getScore()) == 0 && sc.getScore()>=0 && sc.getScore()<=5) {
            return true;
        }else{
            return false;
        }
    }

}
