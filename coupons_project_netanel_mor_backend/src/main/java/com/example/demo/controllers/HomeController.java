package com.example.demo.controllers;

import com.example.demo.beans.Coupon;
import com.example.demo.repository.CouponRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/home")
@CrossOrigin
public class HomeController {

    private CouponRepository couponRepository;

    public HomeController(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    @GetMapping
    public List<Coupon> getAllCoupons(){
        return couponRepository.getAllCoupons();
    }
}

