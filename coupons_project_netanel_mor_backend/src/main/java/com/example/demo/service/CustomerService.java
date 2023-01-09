package com.example.demo.service;

import com.example.demo.beans.Category;
import com.example.demo.beans.Coupon;
import com.example.demo.beans.Customer;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.exceptions.PurchaseFailedException;
import com.example.demo.repository.CompanyRepository;
import com.example.demo.repository.CouponRepository;
import com.example.demo.repository.CustomerRepository;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Set;

@Service
@Scope("prototype")
public class CustomerService extends ClientService{

    private int id;
    private CompanyRepository companyRepository;
    private CouponRepository couponRepository;
    private CustomerRepository customerRepository;

    public CustomerService(CompanyRepository companyRepository, CouponRepository couponRepository, CustomerRepository customerRepository) {
        this.companyRepository = companyRepository;
        this.couponRepository = couponRepository;
        this.customerRepository = customerRepository;
    }

    public int getId() {
        return id;
    }

    @Override
    public int login(String email, String password) {
        id = -1;
        if (customerRepository.findByEmailAndPassword(email, password) !=null)
            this.id = customerRepository.findByEmailAndPassword(email, password).getId();

        return id;
    }


    /**
     * This method returns customer details
     * @return Customer
     * @throws NotFoundException
     */
    public Customer getCustomerDetails() throws NotFoundException {
        return customerRepository.findById(id).orElseThrow(()-> new NotFoundException("Customer not found!"));
    }

    /**
     * This method returns one coupon
     * @param id
     * @return Coupon
     * @throws NotFoundException
     */
    public Coupon getOneCoupon (int id) throws NotFoundException {
        return couponRepository.findById(id).orElseThrow(() -> new NotFoundException("coupon not found"));
    }


    /**
     * This method purchase coupon only if: 1. amount of coupon is > 0 2. coupon is not expired  3. customer has not purchased this coupon yet.
     * @param coupon
     * @return Coupon
     * @throws NotFoundException
     * @throws PurchaseFailedException
     */
    public Coupon purchaseCoupon(Coupon coupon) throws NotFoundException, PurchaseFailedException {
        Date now = new Date(System.currentTimeMillis());

        if (coupon.getAmount()>0  &&
                coupon.getEndDate().after( now) &&
                couponRepository.isCouponPurchasedByCustomer(id, coupon.getId()).isEmpty()
                ) {
            coupon.setAmount(coupon.getAmount() - 1);
            couponRepository.save(coupon);
            couponRepository.purchaseCoupon(id, coupon.getId());
            return coupon;
        }
        else throw new PurchaseFailedException("Failed to complete purchase." +
                "Please check if coupon's amount and expired date are valid. Have you already purchased this coupon?");
    }

    /**
     * This method returns all coupons the customer has purchased.
     * @return Set<Coupon>
     */
    public Set<Coupon> getAllCouponsPurchased(){
        return couponRepository.getCouponsByCustomerId(id);
    }

    /**
     * This method returns all coupons that customer has purchase by category filter
     * @param category
     * @return Set<Coupon>
     */
    public Set<Coupon>getCouponsByCategory(Category category){
        Set<Coupon> coupons = couponRepository.getCouponsByCustomerId(id);
        coupons.removeIf(coupon -> coupon.getCategory() != category);
        return coupons;



    }

    /**
     * This method returns coupons with price lower than max price.
     * @param maxPrice
     * @return List<Coupon
     */
    public List<Coupon> getCouponsByMaxPrice (int maxPrice){
        return couponRepository.getCouponsByCustomerIdAndMaxPrice(id, maxPrice);
    }

    /**
     * This method cancel purchase coupon. Only if coupon has been purchased by customer the purchase will be deleted from database and amount of coupon will be plus 1.
     * @param coupon
     * @return boolean
     */
    public boolean deletePurchaseCoupon(Coupon coupon){
        if (couponRepository.isCouponPurchasedByCustomer(id, coupon.getId()).isPresent()) {
            couponRepository.deletePurchaseCoupon(id, coupon.getId());
            coupon.setAmount(coupon.getAmount() + 1);
            couponRepository.save(coupon);
            return true;
        }
        return false;
    }

    /**
     * This method returns all coupons in db.
     * @return List<Coupon></Coupon>
     */
    public List<Coupon> getAllCoupons(){
        return couponRepository.getAllCoupons();
    }

}
