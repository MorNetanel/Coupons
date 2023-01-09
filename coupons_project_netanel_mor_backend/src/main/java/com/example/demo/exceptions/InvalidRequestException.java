package com.example.demo.exceptions;

public class InvalidRequestException extends Exception{
    public InvalidRequestException(String message) {
        super("Invalid request!");
    }
}
