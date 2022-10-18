package com.example.miprimerspringboot.services;

import com.example.miprimerspringboot.entidades.Category;
import com.example.miprimerspringboot.entidades.Client;
import com.example.miprimerspringboot.entidades.Reservation;
import com.example.miprimerspringboot.entidades.dto.StatusAccount;
import com.example.miprimerspringboot.entidades.dto.TopClients;
import com.example.miprimerspringboot.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

    public List<Reservation> getReservationByPeriod(String date1, String date2){
        SimpleDateFormat parser = new SimpleDateFormat("yyy-MM-dd");
        Date a = new Date();
        Date b = new Date();
        try{
            a = parser.parse(date1);
            b = parser.parse(date2);
        }catch (ParseException e){
            e.printStackTrace();
        };
        if(a.before(b)){
            return reservationRepository.getDatesReport(a, b);
        }else{
            return new ArrayList<Reservation>();
        }
    }
    public StatusAccount getReservationByStatus(){
        List<Reservation> completos = reservationRepository.getStatusReport("completed");
        List<Reservation> canceladas = reservationRepository.getStatusReport("cancelled");
        StatusAccount resultado = new StatusAccount(completos.size(), canceladas.size());
        return resultado;
    }
    public List<TopClients> getTopClients(){
       List<TopClients> tc = new ArrayList<>();
       List<Object[]> result = reservationRepository.getTopClients();
       for(int i=0; i<result.size();i++){
           int total = Integer.parseInt(result.get(i)[1].toString());
           Client cl = (Client)result.get(i)[0];
           TopClients topClients = new TopClients(total, cl);
           tc.add(topClients);
       }

       return tc;
    }
}
