import axios from "axios";
import CouponModel from "../Models/CouponModel";
import { couponsStore, createAddActionCoup, createClearActionCoup, createDeleteActionCoup, createEditActionCoup, createFetchActionCoup } from "../Redux/CouponsState";
import appConfig from "../Util/Config";
import {Category} from "../Models/CouponModel";
import CompanyModel from "../Models/CompanyModel";
import { authStore } from "../Redux/AuthState";
import Company from "../Components/CompanyArea/CompanyDetails/CompanyDetails";
import { stringify } from "querystring";


class CompanyService{
     

    
    public async addCoupon(coupon:CouponModel){

        //set company object in coupon object
            let companyId : number = authStore.getState().user.id;
            let email : string = authStore.getState().user.email;
            let name : string = authStore.getState().user.name;
            let company : CompanyModel = new CompanyModel(companyId, name, email, "");
            coupon.company = company;
    
    //set start date as today
            let date : Date = new Date();
            let currentDate = date.getDate();
            let mount = new Date();
            let currentMonth = mount.getMonth();
            let year = new Date();
            let currentYear = year.getFullYear();
            coupon.startDate = new Date(currentYear, currentMonth, currentDate);
    
        let reader = new FileReader();
        var image = coupon.image as FileList;
        reader.readAsDataURL(image[0]);
        reader.onload = async function () {
             coupon.image = reader.result as string;
             const response =   await axios.post(appConfig.companyUrl + "add", coupon);
            const newCoupon = response.data;
            console.log(newCoupon);
            setTimeout(()=>{
               
            }, 8000);
            
            
            
            couponsStore.dispatch(createAddActionCoup(newCoupon));
           
            
            return newCoupon;

    
        };
        // reader.onerror = function (error) {
        //   console.log('Error: ', error);
        // };
        
        }





    public async updateCoupon(coupon:CouponModel){
        let companyId : number = authStore.getState().user.id;
            let email : string = authStore.getState().user.email;
            let company : CompanyModel = new CompanyModel(companyId, " ", email, "");
            coupon.company = company;
        let reader = new FileReader();
        var image = coupon.image as FileList;
        reader.readAsDataURL(image[0]);
        reader.onload = async function () {
             coupon.image = reader.result as string;
        const response = await axios.put(appConfig.companyUrl + "updatecoupon/" + coupon.id , coupon);
        const newCoupon = response.data;
        setTimeout(()=>{
               
        }, 8000);
        
        couponsStore.dispatch(createEditActionCoup(newCoupon));
        return newCoupon;
    }
}

    public async deleteCoupon(id:number){
        const response = (await axios.delete(appConfig.companyUrl  + id)).data;
        couponsStore.dispatch(createDeleteActionCoup(id));
        return response;
    }

    public async getOneCoupon(id:number){
        const coupon = couponsStore.getState().coupons.find(coup => coup.id == id)
        // const coupon = couponsStore.getState().coupons.find(coupon => coupon.id == id);    
        if (typeof coupon ==="undefined")
           return await (await axios.get<CouponModel>(appConfig.companyUrl + "coupon/" + id)).data;
        
        return coupon;
    }

    public async getCoupons(){
        if (couponsStore.getState().coupons.length == 0){
            const response = axios.get<CouponModel[]>(appConfig.companyUrl + "coupons");
            const coupons = (await response).data;
            couponsStore.dispatch (createFetchActionCoup(coupons));
            return (await response).data;
        }
        else{
        const compId = authStore.getState().user.id;
         return couponsStore.getState().coupons.filter(coup => coup.company.id == compId);
        }
    }

    public async getByCategory(cat :string){

        if (couponsStore.getState().coupons.length == 0){
            const response = axios.get<CouponModel[]>(appConfig.companyUrl + "coupons");
            const coupons = (await response).data;
            couponsStore.dispatch (createFetchActionCoup(coupons));
            return coupons.filter(coup => coup.category.valueOf().toString() === cat);
        }
        else{
            const couponsList = couponsStore.getState().coupons.filter (coup => coup.category.valueOf().toString() === cat);
            return couponsList;
        }

    }




    public async getByMaxPrice(maxPrice :number){
        if (couponsStore.getState().coupons.length == 0){
            const response = axios.get<CouponModel[]>(appConfig.companyUrl + "coupons");
            const coupons = (await response).data;
            couponsStore.dispatch (createFetchActionCoup(coupons));
            return coupons.filter (coup => coup.price <= maxPrice);
        }
        else{

            

            const couponsList = couponsStore.getState().coupons.filter (coup => coup.price <= maxPrice);
            const compId = authStore.getState().user.id;
            couponsList.filter(coup => coup.company.id == compId);
            console.log(couponsList);

            return couponsList;
        }
    }

    public async getDetails(){
        const response = axios.get<CompanyModel>(appConfig.companyUrl + "details");
        
        return (await response).data;
    }


}






const companyService = new CompanyService();
export default companyService;