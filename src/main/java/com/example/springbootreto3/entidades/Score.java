package com.example.springbootreto3.entidades;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table (name = "score")
public class Score implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idScore;
    private Integer score;
    private Reservation reservation;
}
