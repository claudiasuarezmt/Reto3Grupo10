package com.example.springbootreto3.entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "client")
public class Client implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer idClient;
    private String email;
    private String password;
    private String name;
    private Integer age;

    @OneToMany(cascade ={CascadeType.PERSIST},mappedBy = "client")
    //@JoinColumn(name = "libraryId")
    @JsonIgnoreProperties({"client","lib"})
    private List<Message>messages;
    //private Category category;

    @OneToMany(cascade ={CascadeType.PERSIST},mappedBy = "client")
    @JsonIgnoreProperties({"client"})
    private List<Reservation> reservations;

}
