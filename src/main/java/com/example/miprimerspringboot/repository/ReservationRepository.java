package com.example.miprimerspringboot.repository;

import com.example.miprimerspringboot.entidades.Category;
import com.example.miprimerspringboot.entidades.Reservation;
import com.example.miprimerspringboot.repository.CRUDRepository.ReservationCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class ReservationRepository {
    @Autowired
    private ReservationCRUDRepository reservationCRUDRepository;

    public List<Reservation> getAll(){
        return (List<Reservation>) reservationCRUDRepository.findAll();

    }
    public Reservation save (Reservation r) {
        return reservationCRUDRepository.save(r);
    }

    public Optional<Reservation> getById(int id){
        return reservationCRUDRepository.findById(id);
    }

    public void delete(Reservation c){
        reservationCRUDRepository.delete(c);
    }

    public List<Reservation> getDatesReport(Date d1, Date d2){
        return reservationCRUDRepository.findAllByStartDateAfterAndStartDateBefore(d1, d2);
    }
    public List<Reservation> getStatusReport(String status){
        return reservationCRUDRepository.findAllByStatus(status);
    }
    public List<Object[]> getTopClients(){
        return reservationCRUDRepository.getTopClients();
    }
}