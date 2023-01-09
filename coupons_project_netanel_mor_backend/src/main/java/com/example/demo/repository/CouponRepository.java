package com.example.demo.repository;

import com.example.demo.beans.Category;
import com.example.demo.beans.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Transactional
@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {



    public List<Coupon> getCouponsByCompanyId(int companyId);

    @Query(value = "select * from coupons join customers_coupons on coupons.id = customers_coupons.coupons_id where customers_coupons.customer_id = ?1", nativeQuery = true)
    public Set<Coupon> getCouponsByCustomerId (int customerId);

    @Modifying
    public void deleteCouponByCompanyId (int id);

    @Query(value = "select * from coupons where comapany_id = ?1 and id = ?2", nativeQuery = true)
    public Coupon getCouponByCompanyIdAndId(int id, int couponId);

    @Modifying
    @Query(value = "delete from customers_coupons where coupons_id = ?1", nativeQuery = true)
    public void deleteCouponPurchaseHistory(int couponsId);

    public List<Coupon> getCouponsByCompanyIdAndCategory(int companyId, Category category);

    @Query(value = "select * from coupons where company_id = ?1 and price < ?2", nativeQuery = true)
    public List<Coupon>getCouponsByCompanyIdAndMaxPrice(int companyId, int maxPrice);

    @Query(value = "select * from coupons where title =?1 and company_id = ?2" , nativeQuery = true)
    public Coupon getCouponByTitleAndCompanyId(String title, int companyId);

    @Query(value = "select customer_id from customers_coupons where customer_id = ?1 and coupons_id = ?2", nativeQuery = true)
    public Optional<Integer> isCouponPurchasedByCustomer(int customerId, int couponsId);

    @Query(value = "select * from coupons where company_id = ?1 and id = ?2", nativeQuery = true)
    public Coupon getCouponByCompanyIdAndCouponId(int comapnyId, int couponId);

    @Modifying
    @Query(value = "insert into customers_coupons values (?1, ?2)", nativeQuery = true)
    public void purchaseCoupon (int customerId, int couponId);

    @Modifying
    @Query(value = "delete from customers_coupons where customer_id = ?1 and coupons_id = ?2", nativeQuery = true)
    public void deletePurchaseCoupon(int customerId, int couponId);

    @Query(value = "select * from coupons ", nativeQuery = true)
    public List<Coupon> getAllCoupons();


















    @Query(value = "select coupons.* from coupons join customers_coupons on coupons.id = customers_coupons.coupons_id " +
            "where customers_coupons.customer_id = ?1 and price < ?2", nativeQuery = true)
    public List<Coupon>getCouponsByCustomerIdAndMaxPrice(int customerId, int maxPrice);


}
