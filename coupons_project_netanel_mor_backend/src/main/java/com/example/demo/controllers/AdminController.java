package com.example.demo.controllers;

import com.example.demo.beans.ClientSession;
import com.example.demo.beans.Company;
import com.example.demo.beans.Customer;
import com.example.demo.exceptions.AddFailedException;
import com.example.demo.exceptions.InvalidRequestException;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.exceptions.UpdateFailedException;
import com.example.demo.job.ExpiredCouponThread;
import com.example.demo.service.AdminService;
import com.example.demo.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(path = "/admin")
@CrossOrigin
public class AdminController {

    private HashMap<String, ClientSession> sessions;

    public AdminController(HashMap<String, ClientSession> sessions) {
        this.sessions = sessions;
    }


    @GetMapping(path = "/companies")
    public ResponseEntity<?> getCompanies( HttpServletRequest request) {
        try {
            AdminService adminService = getService(request);
            return ResponseEntity.ok(adminService.getAllCompanies());
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(path = "/customers")
    public ResponseEntity<?> getCustomers( HttpServletRequest request) {
        try {
            AdminService adminService = getService(request);
            return ResponseEntity.ok(adminService.getAllCustomers());
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(path = "/company/{id}")
    public ResponseEntity<?> getCompany(@PathVariable int id, HttpServletRequest request) {
        try {
            AdminService adminService = getService(request);
            return ResponseEntity.ok(adminService.getOneCompany(id));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body("Company not found!");
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(path = "/customer/{id}")
    public ResponseEntity<?> getCustomer(@PathVariable int id, HttpServletRequest request) {
        try {
            AdminService adminService = getService(request);
            return ResponseEntity.ok(adminService.getOneCustomer(id));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body("Customer not found!");
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(path = "/company")
    public ResponseEntity<?> addCompany(@RequestBody Company company, HttpServletRequest request) {
        try {
            AdminService adminService = getService(request);
            return ResponseEntity.ok(adminService.addCompany(company));
        } catch (AddFailedException e) {
            return ResponseEntity.badRequest().body("Failed to add company!");
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(path = "/customer")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer, HttpServletRequest request) {
        try {
            AdminService adminService = getService(request);
            return ResponseEntity.ok(adminService.addCustomer(customer));
        } catch (AddFailedException e) {
            return ResponseEntity.badRequest().body("Failed to add customer!");
        } catch ( InvalidRequestException e ){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping(path = "/company/{id}")
    public ResponseEntity<String> deleteCompany(@PathVariable int id, HttpServletRequest request) {
        try {
            AdminService adminService = getService(request);
            if (adminService.deleteCompany(id))
                return ResponseEntity.ok("Company deleted successfully");
            else
                return ResponseEntity.badRequest().body("Failed to delete company");
        } catch (InvalidRequestException e) {
           return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping(path = "/customer/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable int id, HttpServletRequest request) {
        try {
            AdminService adminService = getService(request);
            if (adminService.deleteCustomer(id))
                return ResponseEntity.ok("Customer deleted successfully");
            else
                return ResponseEntity.badRequest().body("Failed to delete customer");
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(path = "/editcompany")
    public ResponseEntity<?> updateCompany(@RequestBody Company company, HttpServletRequest request) {
        try {
            AdminService adminService = getService(request);
            adminService.updateCompany(company);
            return ResponseEntity.ok(adminService.updateCompany(company));
        } catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(path = "/editcustomer")
    public ResponseEntity<?> updateCustomer(@RequestBody Customer customer, HttpServletRequest request) {


        try {
            AdminService adminService = getService(request);
            return ResponseEntity.ok(adminService.updateCustomer(customer));
        } catch (UpdateFailedException e) {
            return ResponseEntity.badRequest().body("Failed to update customer!");
        }catch (InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private AdminService getService(HttpServletRequest request) throws InvalidRequestException {
        String token = request.getHeader("authorization").replace("Bearer ", "");

        ClientSession clientSession = sessions.get(token);
        if (clientSession != null ) {
            clientSession.setLastActive(System.currentTimeMillis());
            return (AdminService) clientSession.getService();
        }
        else throw new InvalidRequestException("Invalid request!");
    }
}
