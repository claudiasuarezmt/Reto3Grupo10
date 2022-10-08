package com.example.springbootreto3.entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "library")
public class Library implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String target;
    private Integer capacity;
    private String description;


    private Category category;

    @OneToMany(cascade ={CascadeType.PERSIST},mappedBy = "lib")
    @JsonIgnoreProperties({"client","lib"})
    private List<Message>messages;

    @OneToMany(cascade ={CascadeType.PERSIST},mappedBy = "lib")
    @JsonIgnoreProperties({"client","lib"})
    private List<Reservation>reservations;

    public Library() {
    }
}
