package com.example.demo.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.beans.ClientSession;
import com.example.demo.beans.Credentials;
import com.example.demo.exceptions.LoginException;
import com.example.demo.loginManager.ClientType;
import com.example.demo.loginManager.LoginManager;
import com.example.demo.service.AdminService;
import com.example.demo.service.ClientService;
import com.example.demo.service.CompanyService;
import com.example.demo.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class LoginController {

    private LoginManager loginManager;
    protected HashMap<String, ClientSession> sessions;

    public LoginController(LoginManager loginManager, HashMap<String, ClientSession> sessions) {
        this.loginManager = loginManager;
        this.sessions = sessions;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody Credentials credentials) {

        ClientService clientService = null;
        try {

            clientService = loginManager.login(credentials.getEmail(), credentials.getPassword(), credentials.getClientType());

            int id = 0;
            if (clientService instanceof AdminService)
                id = 0;
            else if (clientService instanceof CompanyService)
                id = ((CompanyService) clientService).getId();
            else if (clientService instanceof CustomerService)
                id = ((CustomerService) clientService).getId();
            String token = createToken(credentials, id);

            sessions.put(token, new ClientSession(clientService, System.currentTimeMillis()));


            return ResponseEntity.ok(token);

        } catch (LoginException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }

    }


    private String createToken(Credentials credentials, int id){
        String token = JWT.create()
                .withIssuer("NatiMor&RotemBarak")
                .withIssuedAt(new Date())
                .withClaim("id", id)
                .withClaim("email", credentials.getEmail())
                .withClaim("clienttype", credentials.getClientType().toString())
                .sign(Algorithm.HMAC256("javafullstackdevelopers"));
        return token;
    }
}
