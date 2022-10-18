package com.example.miprimerspringboot.controller;


import com.example.miprimerspringboot.entidades.Category;
import com.example.miprimerspringboot.entidades.Reservation;
import com.example.miprimerspringboot.entidades.dto.StatusAccount;
import com.example.miprimerspringboot.entidades.dto.TopClients;
import com.example.miprimerspringboot.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Reservation")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/all")
    public List<Reservation> getAll(){
        return reservationService.getAll();
    }
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation r){
        return reservationService.save(r);
    }

    @GetMapping("/{id}")
    public Optional<Reservation> getReservation(@PathVariable("id") int reservationId){
        return reservationService.getById(reservationId);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation update(@RequestBody Reservation u){
        return reservationService.update(u);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){
        return reservationService.delete(id);
    }

    @GetMapping("/report-dates/{d1}/{d2}")
    public List<Reservation> getReservationsPeriod(@PathVariable("d1") String d1, @PathVariable("d2") String d2){
        return reservationService.getReservationByPeriod(d1,d2);
    }
    @GetMapping("/report-status")
    public StatusAccount getReservationsPeriod(){
        return reservationService.getReservationByStatus();
    }
    @GetMapping("/report-clients")
    public List<TopClients> getTopClients(){
        return reservationService.getTopClients();
    }

}