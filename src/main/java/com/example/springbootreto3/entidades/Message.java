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

    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "message")
    @JsonIgnoreProperties({"client", "lib"})
    private Library lib;

    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "message")
    @JsonIgnoreProperties({"client", "lib"})
    private Client client;

    public Integer getIdMessage() {
        return idMessage;
    }

    public void setIdMessage(Integer id) {
        this.idMessage = id;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public Library getLib() {
        return lib;
    }

    public void setLib(Library lib) {
        this.lib = lib;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Library getIdLibrary() {
        Library idLibrary = null;
        return idLibrary;
    }

    public void setIdLibrary(Library idLibrary) {
    }

    public Client getIdClient() {
        return client;
    }

    public void setIdClient(Client idClient) {
    }
}





// Messagetext  lib - target - capacity - category - client