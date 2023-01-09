package com.example.demo;

import com.example.demo.beans.*;
import com.example.demo.exceptions.AddFailedException;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.job.ExpiredCouponThread;
import com.example.demo.loginManager.ClientType;
import com.example.demo.loginManager.LoginManager;
import com.example.demo.repository.CouponRepository;
import com.example.demo.service.AdminService;
import com.example.demo.service.CompanyService;
import com.example.demo.service.CustomerService;
import com.example.demo.sessionsRemover.SessionRemoveThread;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

import javax.security.auth.login.LoginException;
import java.sql.Date;
import java.util.HashMap;
import java.util.Optional;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {

		ConfigurableApplicationContext ctx = SpringApplication.run(DemoApplication.class, args);



		//JOB DELETE ALL EXPIRED COUPONS
		Thread thread = new Thread(ctx.getBean(ExpiredCouponThread.class));
		thread.start();


		//JOB DELETE ALL SERVICES NOT ACTIVE FOR HALF HOUR
		Thread thread1 = new Thread(ctx.getBean(SessionRemoveThread.class));
		thread1.start();

		//LOGIN MANAGER
		LoginManager loginManager = ctx.getBean(LoginManager.class);

		//ADMIN
//		try {
//////			LOGIN
//			AdminService adminService = (AdminService) loginManager.login("admin@admin.com", "admin", ClientType.ADMIN);

			//ADD COMPANY
//			adminService.addCompany(new Company("dddd", "bb", "aaaaa"));

			//UPDATE COMPANY
//			Company company = adminService.getOneCompany(6);
//			company.setEmail("adhd");
//			adminService.updateCompany(company);



//		//GET ONE COMPANY
//			Company company = adminService.getOneCompany(2);
//			System.out.println(company);
//			System.out.println(company.getCoupons());

			//DELETE COMPANY
//		    adminService.deleteCompany(9);

			//ADD CUSTOMER
//			adminService.addCustomer(new Customer("333", "33", "@12", "haimshely"));


			//GET ONE CUSTOMER
//			System.out.println(adminService.getOneCustomer(6));
//			System.out.println(adminService.getOneCustomer(6).getCoupons());

			//UPDATE CUSTOMER
//			Customer customer = adminService.getOneCustomer(22);
//			System.out.println(customer);
//			customer.setEmail("n@2");
//			adminService.updateCustomer(customer);
//			System.out.println(customer);


			//DELETE CUSTOMER
//		    System.out.println(adminService.deleteCustomer(3));
//		    adminService.deleteCustomer(6);

			//GET ALL COMPANIES
//			System.out.println(adminService.getAllCompanies());

			//GET ALL CUSTOMERS
//		    System.out.println(adminService.getAllCustomers());




//		} catch (Exception e) {
//			System.out.println(e.getMessage());
//		}


		//COMPANY
//		try {
//////////			//LOGIN
//			CompanyService companyService = (CompanyService) loginManager.login("rr", "bb", ClientType.COMPANY);
////////
////////			//GET COMPANY
//			System.out.println(companyService.getCompanyDetails());

//			//ADD COUPON
//			companyService.addCoupon(new Coupon(companyService.getCompanyDetails(), Category.FOOD, "meat"
//					, "(_^^^_)", Date.valueOf("2022-10-18"), Date.valueOf("2022-11-12"), 1,15.8 ));
//
//			//DELETE COUPON
//			System.out.println(companyService.deleteCoupon(2));
//			companyService.deleteCoupon(18);

			//GET ALL COUPONS
//			System.out.println(companyService.getAllCoupons());

			//GET ONE COUPON
//			System.out.println(companyService.getOneCoupon(15));

			//UPDATE COUPON
//			Coupon coupon = companyService.getOneCoupon(11);
//			coupon.setEndDate(Date.valueOf("2022-08-18"));
//			companyService.updateCoupon(coupon);


//			System.out.println(companyService.getOneCoupon(4));

			//GET COUPONS BY CATEGORY
//			System.out.println(companyService.getAllCouponsByCategory(Category.FOOD));

			//GET COUPONS BY MAX PRICE
//			System.out.println(companyService.getAllCouponsByMaxPrice(15));


//		} catch (Exception e) {
//			System.out.println(e.getMessage());
//		}




	//CUSTOMER

//		try {
////////
//////////		//LOGIN
//			CustomerService customerService = (CustomerService) loginManager.login("@11222", "haimshely",ClientType.CUSTOMER );
//////////
//////////	//GET CUSTOMER DETAILS
//			System.out.println(customerService.getCustomerDetails());
//
////			//GET ONE COUPON
//			System.out.println(customerService.getOneCoupon(15));
//			Coupon myCoupon = customerService.getOneCoupon(15);
////
////			//PURCHASE COUPON
//			customerService.purchaseCoupon(myCoupon);
//
//
//
//			//GET COUPONS BY CATEGORY
////			System.out.println(customerService.getCouponsByCategory(Category.FOOD));
//
//			//GET COUPONS BY MAX PRICE
////			System.out.println(customerService.getCouponsByMaxPrice(18));
//
//			//DELETE PURCHASE
//			System.out.println(customerService.deletePurchaseCoupon(myCoupon));
////
////
//////
//
//			//GET ALL COUPONS
//			System.out.println(customerService.getAllCoupons());


//		} catch (Exception e) {
//			System.out.println(e.getMessage());
//		}
////





}

//  Data Structure. key is the token of user. value is an object contains user service and long number of time last active.
	@Bean
	public HashMap<String, ClientSession> sessions(){
		HashMap<String, ClientSession> sessions = new HashMap<>();
		return sessions;
	}
}


