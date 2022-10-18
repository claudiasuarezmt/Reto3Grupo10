package com.example.miprimerspringboot.repository.CRUDRepository;

import com.example.miprimerspringboot.entidades.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface ReservationCRUDRepository extends CrudRepository<Reservation,Integer> {
    public List<Reservation> findAllByStartDateAfterAndStartDateBefore(Date fecha1, Date fecha2);
    public List<Reservation> findAllByStatus(String status);
    @Query("SELECT c.client, COUNT(c.client) as total FROM Reservation AS c group by c.client order by COUNT(c.client) DESC ")
    public List<Object[]> getTopClients();
}
