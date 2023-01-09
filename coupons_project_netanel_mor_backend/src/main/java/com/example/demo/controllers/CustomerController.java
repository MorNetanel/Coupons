package com.example.demo.controllers;

import com.example.demo.beans.Category;
import com.example.demo.beans.ClientSession;
import com.example.demo.beans.Coupon;
import com.example.demo.exceptions.InvalidRequestException;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.exceptions.PurchaseFailedException;
import com.example.demo.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "/customer")
@CrossOrigin
public class CustomerController {


    private HashMap<String, ClientSession> sessions;



    public CustomerController(HashMap<String, ClientSession> sessions) {
        this.sessions = sessions;
    }

    @GetMapping(path = "/details")
    public ResponseEntity<?> getDetails (HttpServletRequest request ){
        try {
        CustomerService customerService = getService( request );

            return ResponseEntity.ok(customerService.getCustomerDetails());
        } catch ( InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (NotFoundException e){
            return  ResponseEntity.badRequest().body("Failed to get details!");
        }
    }

    @GetMapping(path = "/coupon/{id}")
    public ResponseEntity<?> getOneCoupon (@PathVariable int id, HttpServletRequest request){
        try {
            CustomerService customerService = getService( request );

            return ResponseEntity.ok(customerService.getOneCoupon(id));
        } catch (NotFoundException  e) {
            return ResponseEntity.badRequest().body("Coupon not found!");
        } catch (InvalidRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(path = "/purchase")
    public ResponseEntity<?>purchaseCoupon (@RequestBody Coupon coupon, HttpServletRequest request){
        try {
            CustomerService customerService = getService( request );

            return ResponseEntity.ok(customerService.purchaseCoupon(coupon));
        } catch (NotFoundException  e  ) {
            return ResponseEntity.badRequest().body("Coupon not found!");
        } catch (InvalidRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (PurchaseFailedException e){
            return ResponseEntity.badRequest().body("Purchase failed!");
        }
    }

    @GetMapping(path = "/purchased")
    public ResponseEntity<?> getAllCouponsPurchased(HttpServletRequest request)  {
        try {
            CustomerService customerService = getService( request );
            return ResponseEntity.ok(customerService.getAllCouponsPurchased());
        } catch (InvalidRequestException e) {
           return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping(path = "/category/{category}")
    public ResponseEntity<?>getCouponsByCategory(@RequestParam Category category, HttpServletRequest request)  {
        try {
            CustomerService customerService = getService( request );
            return ResponseEntity.ok(customerService.getCouponsByCategory(category));
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(path = "/maxprice/{price}")
    public ResponseEntity<?>getByMaxPrice(@PathVariable int price, HttpServletRequest request)  {

        try {
            CustomerService customerService = getService( request );
            return ResponseEntity.ok(customerService.getCouponsByMaxPrice(price));
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PutMapping(path = "/delete")
    public ResponseEntity<?> deletePurchase (@RequestBody Coupon coupon, HttpServletRequest request)  {
        try {
            CustomerService customerService = getService(request);
            if (customerService.deletePurchaseCoupon(coupon)) {
                return ResponseEntity.ok("Purchase has been deleted successfully");
            }else return ResponseEntity.badRequest().body("Failed to delete!");
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?>getAllCoupons(HttpServletRequest request) {
        try {
            CustomerService customerService = getService(request);

            return ResponseEntity.ok(customerService.getAllCoupons());
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    private CustomerService getService(HttpServletRequest request) throws InvalidRequestException {
        String token = request.getHeader("authorization").replace("Bearer ", "");

        ClientSession clientSession = sessions.get(token);
        if (clientSession != null ) {
            clientSession.setLastActive(System.currentTimeMillis());
            return (CustomerService) clientSession.getService();


        }
        else throw new InvalidRequestException("Invalid request!");
    }


}
