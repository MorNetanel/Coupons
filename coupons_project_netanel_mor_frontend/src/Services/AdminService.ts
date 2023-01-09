import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import CustomerModel from "../Models/CustomerModel";
import { companiesStore, createDeleteActionComp, createEditActionComp } from "../Redux/CompanyState";
import { createFetchActionComp } from "../Redux/CompanyState";
import { createDeleteActionCust, createEditActionCust, createFetchActionCust } from "../Redux/CustomerState";
import { customersStore } from "../Redux/CustomerState";
import appConfig from "../Util/Config";

class AdminService{

    public async getCompanies(){
        if(companiesStore.getState().companies.length == 0){
            const response = await axios.get<CompanyModel[] >(appConfig.adminUrl + "companies/");
            const companies = response.data;
            companiesStore.dispatch(createFetchActionComp(companies));
            return response.data;
        } else {
            return companiesStore.getState().companies;
        }
    }

    public async getCustomers(){
        if(customersStore.getState().customers.length == 0){
            const response = await axios.get<CustomerModel[] >(appConfig.adminUrl + "customers/");
            customersStore.dispatch(createFetchActionCust(response.data));
            return response.data;
        } else {
            return customersStore.getState().customers;
        }
    }

    public async getOneCompany(id :number){
        const company = companiesStore.getState().companies.find(comp =>comp.id == id);
        if (typeof company === "undefined"){
        return await (await axios.get<CompanyModel>(appConfig.adminUrl+"company/" + id)).data;
        }
        return company;
    }

    public async getOneCustomer(id: number) {
        const customer = customersStore.getState().customers.find(cust => cust.id == id);
        if (typeof customer === "undefined")
        return await (await axios.get<CustomerModel>(appConfig.adminUrl+"customer/" + id)).data;
        return customer;
    }

    public async addCompany (company:CompanyModel){

        const response = await axios.post(appConfig.adminUrl + "company", company);
        const newCompany = response.data;
        companiesStore.dispatch(createFetchActionComp(newCompany));
    }

    public async addCustomer (customer:CustomerModel){
        
        const response = await axios.post(appConfig.adminUrl + "customer", customer);
        
        
        const newCustomer = response.data;
        customersStore.dispatch(createFetchActionCust(newCustomer));
    }

    public async deleteCompany (id:number){
        const response = await (await axios.delete(appConfig.adminUrl + "company/" + id)).data;
        companiesStore.dispatch(createDeleteActionComp(id));
        return response;
    }

    public async deleteCustomer (id:number){
        const response = await (await axios.delete(appConfig.adminUrl + "customer/" + id)).data;
        customersStore.dispatch(createDeleteActionCust(id));
        return response;
    }

    public async updateCompany (company:CompanyModel){
        
        
        const response = await axios.put(appConfig.adminUrl + "editcompany", company);
        const newCompany = response.data;
        companiesStore.dispatch(createEditActionComp(newCompany));
    }

    public async updateCustomer (customer: CustomerModel){
        const response = await axios.put(appConfig.adminUrl + "editcustomer", customer);
        const newCustomer = response.data;
        customersStore.dispatch(createEditActionCust(newCustomer));
    }


}

const adminService = new AdminService();
export default adminService;