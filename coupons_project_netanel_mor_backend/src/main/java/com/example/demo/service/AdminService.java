package com.example.demo.service;

import com.example.demo.beans.Company;
import com.example.demo.beans.Coupon;
import com.example.demo.beans.Customer;
import com.example.demo.exceptions.AddFailedException;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.exceptions.UpdateFailedException;
import com.example.demo.job.ExpiredCouponThread;
import com.example.demo.repository.CompanyRepository;
import com.example.demo.repository.CouponRepository;
import com.example.demo.repository.CustomerRepository;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service

public class AdminService extends ClientService {



    private CompanyRepository companyRepository;
    private CustomerRepository customerRepository;
    private CouponRepository couponRepository;



    public AdminService(CompanyRepository companyRepository, CustomerRepository customerRepository, CouponRepository couponRepository) {
        this.companyRepository = companyRepository;
        this.customerRepository = customerRepository;
        this.couponRepository = couponRepository;
    }

    /**
     * This method checks if email and password of admin are current and returns 1 if true or else -1
     * @param email
     * @param password
     * @return int
     */
    @Override
    public int login(String email, String password) {
        if (email.equals("admin@admin.com") && (password.equals("admin")))
            return 1;
        return -1;
    }

    /**
     * This method add company into database. If company name or company email already exist an exception will be thrown.
     * @param company
     * @return Company
     * @throws AddFailedException
     */
    public Company addCompany (Company company) throws AddFailedException {
        if(companyRepository.findByName(company.getName()) == null && companyRepository.findByEmail(company.getEmail()) == null  )
            return companyRepository.save(company);
        else throw new AddFailedException("Failed to add company! name or email already exist. please choose other name/email.");
    }

    /**
     * This method updates company. If updated successfully optional of company will be returns. Else optional empty will by returns.
     * @param company
     * @return Optional
     * @throws
     */
    public Optional<Company> updateCompany(Company company) {
        if (companyRepository.existsById(company.getId()))
            return Optional.of(companyRepository.save(company));
        else return Optional.empty();
    }

    /**
     * This method returns company and company's coupons if found by id. Else throws exception
     * @param id
     * @return Company
     * @throws NotFoundException
     */
    public Company getOneCompany (int id) throws NotFoundException {
        Company company = companyRepository.findById(id).orElseThrow(()->new NotFoundException("Company not found!"));
        company.setCoupons(couponRepository.getCouponsByCompanyId(id));
        return company;
    }


    /**
     * This method delete company by id. All coupons and coupon's purchase history will be deleted.
     * @param id
     * @return Boolean
     */
    @Transactional
    public boolean deleteCompany (int id){
        if (companyRepository.existsById(id)){
            List<Coupon> coupons = couponRepository.getCouponsByCompanyId(id);

            for (int i = 0; i < coupons.size(); i++) {
                couponRepository.deleteCouponPurchaseHistory(coupons.get(i).getId());
            }

            for (int i = 0; i < coupons.size(); i++) {
                couponRepository.deleteCouponByCompanyId(id);
                System.out.println(coupons);

            }


            companyRepository.deleteById(id);
            return true;
        }
        else return false;
    }

    /**
     * This method returns all companies
     * @return All Companies
     */
    public List<Company> getAllCompanies(){
        return companyRepository.findAll();
    }


    /**
     * This method add customer into database. If email already exist in database an exception will be thrown.
     * @param customer
     * @return Customer
     * @throws AddFailedException
     */
    public Customer addCustomer(Customer customer) throws AddFailedException {
        if (customerRepository.findByEmail(customer.getEmail()) == null)
            return customerRepository.save(customer);
        else
            throw new AddFailedException("Failed to add customer. change customers email please");
    }

    /**
     * This method updates customer if customer found by id.
     * @param customer
     * @return Customer
     * *@throws UpdateFailedException
     */
    public Customer updateCustomer (Customer customer) throws UpdateFailedException {

        if (customerRepository.existsById(customer.getId()))


            return customerRepository.save(customer);

        else throw new UpdateFailedException("Failed to update customer");
    }

    @Transactional
    /**
     * This method delete customer and customer's purchase history from database.
     */
    public boolean deleteCustomer (int id){
        if (customerRepository.existsById(id)){
            customerRepository.deleteCustomersCouponPurchaseHistory(id);
            customerRepository.deleteById(id);
            return true;
        }
        else return false;
    }

    /**
     * This method returns all customers
     * @return List Customers
     */
    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }

    /**
     * This method returns customer and customer's coupons if found by id. Else throws exception
     * @param id
     * @return Customer
     * @throws NotFoundException
     */
    public Customer getOneCustomer(int id) throws NotFoundException {
        Customer customer = customerRepository.findById(id).orElseThrow(()->new NotFoundException("Customer not found. please insert a valid id number"));
        customer.setCoupons(couponRepository.getCouponsByCustomerId(id));
        return customer;
    }













}
