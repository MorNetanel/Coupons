package com.example.demo.repository;

import com.example.demo.beans.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    public Customer findByEmail(String email);

    @Modifying
    @Query(value = "delete from customers_coupons where customer_id = ?1", nativeQuery = true)
    public void deleteCustomersCouponPurchaseHistory(int customerId);


    @Query(value = "select * from customers where email = ?1 and password = ?2", nativeQuery = true)
    public Customer findByEmailAndPassword(String email, String password);




}
