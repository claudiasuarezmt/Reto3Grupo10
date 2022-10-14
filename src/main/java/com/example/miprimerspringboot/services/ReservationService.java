package com.example.miprimerspringboot.services;

import com.example.miprimerspringboot.entidades.Category;
import com.example.miprimerspringboot.entidades.Reservation;
import com.example.miprimerspringboot.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }

    public Reservation save(Reservation r){
        return reservationRepository.save(r);
    }
    public Optional<Reservation> getById(int id){
        return reservationRepository.getById(id);
    }

    public Reservation update(Reservation u){
        if (u.getIdReservation()!=null){
            Optional<Reservation> resv=reservationRepository.getById(u.getIdReservation());
            if (resv.isPresent()){
                Reservation oldCat=resv.get();
                if (u.getStartDate()!=null){
                    oldCat.setStartDate(u.getStartDate());
                }
                if (u.getDevolutionDate()!=null){
                    oldCat.setDevolutionDate(u.getDevolutionDate());
                }
                if (u.getStatus()!=null){
                    oldCat.setStatus(u.getStatus());
                }

                return reservationRepository.save(oldCat);
            }
        }
        return u;
    }

    public boolean delete(int id){
        Optional<Reservation> reser=reservationRepository.getById(id);
        if(reser.isPresent()){
            reservationRepository.delete(reser.get());
            return true;
        }else{
            return false;
        }

    }
}
