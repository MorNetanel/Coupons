package com.example.demo.service;

import com.example.demo.beans.Category;
import com.example.demo.beans.Company;
import com.example.demo.beans.Coupon;
import com.example.demo.exceptions.AddFailedException;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.repository.CompanyRepository;
import com.example.demo.repository.CouponRepository;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
@Scope("prototype")
public class CompanyService extends ClientService {

    private int id;
    private CouponRepository couponRepository;
    private CompanyRepository companyRepository;

    public CompanyService(CouponRepository couponRepository, CompanyRepository companyRepository) {
        this.couponRepository = couponRepository;
        this.companyRepository = companyRepository;
    }

    public int getId() {
        return id;
    }

    /**
     * This method add coupon into database only if coupon's title is unique for the company, amount is positive and end date has not expired.
     * @param coupon
     * @return
     */
    public Coupon addCoupon (Coupon coupon) throws AddFailedException {
        Date now = new Date(System.currentTimeMillis());
        if (couponRepository.getCouponByTitleAndCompanyId(coupon.getTitle(), coupon.getCompany().getId() ) == null
        &&
        coupon.getAmount() > 0
        &&
        coupon.getEndDate().after(now))
        return couponRepository.save(coupon);
        else
            throw new AddFailedException("Failed to add coupon.\n" +
                    "Please make sure that amount is valid (positive) and coupon's name does not exist in company's coupons. " +
                    "Also check if end date of coupon does not expired");
    }

    /**
     * This method updates coupon if exist by id.
     * @param coupon
     * @return Optional
     */
    public Optional<Coupon> updateCoupon (Coupon coupon){
        if (couponRepository.existsById(coupon.getId())){
            return Optional.of(couponRepository.save(coupon));
        }
        else return Optional.empty();
    }

    /**
     * This method delete coupon and coupon's purchase history by id.Delete will be successfull only if coupon added by the same company.
     * @param coupon_Id
     * @return Boolean
     */
    public boolean deleteCoupon (int coupon_Id){
        Coupon coupon = couponRepository.getCouponByCompanyIdAndCouponId(id, coupon_Id);
        if (couponRepository.existsById(coupon_Id) && coupon != null){
            couponRepository.deleteCouponPurchaseHistory(coupon_Id);
            couponRepository.deleteById(coupon_Id);
            return true;
        }
        else return false;
    }


    /**
     * This method returns all coupons of company
     * @return List<Coupon>
     */
    public List<Coupon> getAllCoupons(){
        return couponRepository.getCouponsByCompanyId(id);
    }

    /**
     * This method returns list of coupons by company id and category.
     * @param category
     * @return List<Coupon>
     */
    public List<Coupon> getAllCouponsByCategory(Category category){
        return couponRepository.getCouponsByCompanyIdAndCategory(id, category);
    }

    /**
     * This method returns list of coupons by company id and max price
     * @param maxPrice
     * @return List<Coupon>
     */
    public List<Coupon>getAllCouponsByMaxPrice (int maxPrice){
        return couponRepository.getCouponsByCompanyIdAndMaxPrice(id, maxPrice);
    }


    /**
     * This company returns company details.
     * @param
     * @return Company
     * @throws NotFoundException
     */
    public Company getCompanyDetails () throws NotFoundException {
        return companyRepository.findById(id).orElseThrow(()->new NotFoundException("Company not found"));
    }


    /**
     * This method returns Optional with value of coupon if found by id or empty if not found.
     * @param couponId
     * @return Coupon
     * @throws NotFoundException
     */
    public Coupon getOneCoupon (int couponId) throws NotFoundException {
        if (couponRepository.getCouponByCompanyIdAndCouponId(id, couponId) == null)
            throw new NotFoundException("Coupon not found");
        else
            return couponRepository.getCouponByCompanyIdAndCouponId(id, couponId);
    }









    @Override
    public int login(String email, String password) {
        id = -1;
        if (companyRepository.findByEmailAndPassword(email, password) !=null)
      this.id = companyRepository.findByEmailAndPassword(email, password).getId();

      return id;
    }


}
