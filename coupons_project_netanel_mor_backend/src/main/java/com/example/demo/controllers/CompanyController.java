package com.example.demo.controllers;

import com.example.demo.beans.Category;
import com.example.demo.beans.ClientSession;
import com.example.demo.beans.Company;
import com.example.demo.beans.Coupon;
import com.example.demo.exceptions.AddFailedException;
import com.example.demo.exceptions.InvalidRequestException;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.service.CompanyService;
import com.example.demo.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(path = "/company")
@CrossOrigin
public class CompanyController {

    private HashMap<String, ClientSession> sessions;

    public CompanyController(HashMap<String, ClientSession> sessions) {
        this.sessions = sessions;
    }

    @PostMapping (path = "/add")
    public ResponseEntity<?> addCoupon (@RequestBody Coupon coupon, HttpServletRequest request){

        try {

            CompanyService companyService = getService(request);
            return ResponseEntity.ok(companyService.addCoupon(coupon));
        } catch (AddFailedException | InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping (path = "/updatecoupon/{id}")
    public ResponseEntity<?> updateCoupon (@RequestBody Coupon coupon, HttpServletRequest request){

        try {
            CompanyService companyService = getService(request);
            if (companyService.updateCoupon(coupon).isPresent())
                return ResponseEntity.ok(companyService.updateCoupon(coupon));
            else
                return ResponseEntity.badRequest().body("Failed to update coupon");
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping (path = "/{id}")
    public ResponseEntity<String> deleteCoupon (@PathVariable int id, HttpServletRequest request ){
        try {
            CompanyService companyService = getService(request);
            if (companyService.deleteCoupon(id)){
                return ResponseEntity.ok("Delete successfully");
            }
            else return ResponseEntity.badRequest().body("Failed to delete");
        } catch (InvalidRequestException e) {
           return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(path = "/coupon/{id}")
    public ResponseEntity<?> getOneCoupon (@PathVariable int id, HttpServletRequest request){
            try {
                CompanyService companyService = getService(request);
                return ResponseEntity.ok(companyService.getOneCoupon(id));
            } catch (NotFoundException e) {
                return ResponseEntity.badRequest().body("Coupon not found!");
            } catch (InvalidRequestException e){
                return ResponseEntity.badRequest().body(e.getMessage());
            }
    }

    @GetMapping(path = "/coupons")
    public ResponseEntity<?> getCoupons ( HttpServletRequest request){
       
        try {
            CompanyService companyService = getService(request);
            return ResponseEntity.ok(companyService.getAllCoupons());
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping(path = "/category/{category}")
    public ResponseEntity<?> getByCategory (@RequestParam Category category, HttpServletRequest request){



        try {
            CompanyService companyService = getService(request);
            return ResponseEntity.ok(companyService.getAllCouponsByCategory(category));
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping (path = "/maxprice/{price}")
    public ResponseEntity<?> getByMaxPrice (@PathVariable int price, HttpServletRequest request){
        try {
            CompanyService companyService = getService(request);
            return ResponseEntity.ok(companyService.getAllCouponsByMaxPrice(price));
        } catch (InvalidRequestException e) {
           return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping (path = "/details")
    public ResponseEntity<?> getDetails ( HttpServletRequest request) {
        try {
            CompanyService companyService = getService(request);
            return ResponseEntity.ok(companyService.getCompanyDetails());
        } catch (NotFoundException  e) {
            return ResponseEntity.badRequest().body("Failed to get company details");
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private CompanyService getService(HttpServletRequest request) throws InvalidRequestException {
        String token = request.getHeader("authorization").replace("Bearer ", "");

        ClientSession clientSession = sessions.get(token);
        if (clientSession != null ) {
            clientSession.setLastActive(System.currentTimeMillis());
            return (CompanyService) clientSession.getService();
        }
        else throw new InvalidRequestException("Invalid request!");
    }










}
