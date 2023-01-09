package com.example.demo.job;

import com.example.demo.beans.Coupon;
import com.example.demo.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.SQLException;
import java.util.List;

@Service
public class ExpiredCouponThread implements Runnable{



    private CouponRepository couponRepository;

    public ExpiredCouponThread(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    boolean quit = false;
    public void stopJob(){
        quit = true;
    }
    public void startJob(){
        quit = false;
    }
    @Override
    public void run() {

        while (!quit) {
            Date now = new Date(System.currentTimeMillis());
            try {
                List<Coupon> coupons = couponRepository.getAllCoupons();



                for (Coupon coupon : coupons) {

                    try {
                        if (coupon.getEndDate().before(now)) {
                            //REMOVE COUPON FROM LIST
                            couponRepository.deleteCouponPurchaseHistory(coupon.getId());
                            couponRepository.deleteById(coupon.getId());


                        }
                    } catch (Exception exception) {
                        System.out.println(exception.getMessage());
                    }
                }
                try {
                    Thread.sleep(1000 * 60 * 60 * 24);
                } catch (InterruptedException e) {
                    System.out.println(e.getMessage());
                }
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }

    }
}
