package com.example.demo.beans;

import com.example.demo.service.ClientService;

public class ClientSession {


    private ClientService service;
    private long lastActive;

    public ClientSession(ClientService service, long lastActive) {
        this.service = service;
        this.lastActive = lastActive;
    }

    public ClientService getService() {
        return service;
    }

    public void setService(ClientService service) {
        this.service = service;
    }

    public long getLastActive() {
        return lastActive;
    }

    public void setLastActive(long lastActive) {
        this.lastActive = lastActive;
    }
}
