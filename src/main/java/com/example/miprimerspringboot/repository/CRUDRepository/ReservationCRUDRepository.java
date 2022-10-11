package com.example.miprimerspringboot.repository.CRUDRepository;

import com.example.miprimerspringboot.entidades.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface ReservationCRUDRepository extends CrudRepository<Reservation,Integer> {
}
