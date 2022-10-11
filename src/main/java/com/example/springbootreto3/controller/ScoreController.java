package com.example.springbootreto3.controller;

import com.example.springbootreto3.entidades.Score;
import com.example.springbootreto3.services.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Score save(@RequestBody Score sc){
        return scoreService.save(sc);
    }

}
