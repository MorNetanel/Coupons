package com.example.demo.beans;

import com.example.demo.loginManager.ClientType;

public class Credentials {


    private int id;
    private String email;
    private String password;
    private ClientType clientType;


    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ClientType getClientType() {
        return clientType;
    }


}
