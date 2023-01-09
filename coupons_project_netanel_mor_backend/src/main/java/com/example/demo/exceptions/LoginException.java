package com.example.demo.exceptions;

public class LoginException extends Exception{
    public LoginException() {
        super("FAILED TO LOGIN!");
    }
}
