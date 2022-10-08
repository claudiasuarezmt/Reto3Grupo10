package com.example.springbootreto3.entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "message")
public class Message implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMessage;
    private String messageText;

    @OneToMany(cascade ={CascadeType.PERSIST},mappedBy = "message")
    @JsonIgnoreProperties({"client","lib"})
    private Library lib;

    @OneToMany(cascade ={CascadeType.PERSIST},mappedBy = "message")
    @JsonIgnoreProperties({"client","lib"})
    private Client client;


}
