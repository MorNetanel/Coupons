package com.example.demo.loginManager;

import com.example.demo.exceptions.LoginException;
import com.example.demo.service.AdminService;
import com.example.demo.service.ClientService;
import com.example.demo.service.CompanyService;
import com.example.demo.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class LoginManager {
    @Autowired
    private  ApplicationContext applicationContext;

    public ClientService login(String email, String password, ClientType type) throws LoginException {

        switch(type){
            case ADMIN:
                AdminService adminService = applicationContext.getBean(AdminService.class);
                if(adminService.login(email, password)==-1)
                    throw new LoginException();
                return adminService;

            case CUSTOMER:
                CustomerService customerService = applicationContext.getBean(CustomerService.class);
                if(customerService.login(email, password)==-1){
                    throw new LoginException();}
                return customerService;

            case COMPANY:
                CompanyService companyService = applicationContext.getBean(CompanyService.class);
                if (companyService.login(email, password) == -1)
                    throw new LoginException();
                return companyService;
        }
        return null;
    }
}
