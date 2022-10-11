package com.example.miprimerspringboot.controller;

import com.example.miprimerspringboot.entidades.Score;
import com.example.miprimerspringboot.services.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/Score")
public class ScoreController {
    @Autowired
    private ScoreService scoreService;

    @GetMapping("/all")
    public List<Score> getAll(){
        return scoreService.getAll();
    }
    @GetMapping("/{id}")
    public Optional<Score> getById(@PathVariable("id") int idScore){
        return scoreService.getById(idScore);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Score save(@RequestBody Score sc){
        return scoreService.save(sc);
    }

}
