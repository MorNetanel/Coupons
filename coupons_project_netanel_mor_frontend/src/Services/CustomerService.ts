import axios from "axios";
import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";
import { couponsStore, createFetchActionCoup } from "../Redux/CouponsState";
import appConfig from "../Util/Config";
import Category from "../Models/CouponModel";
import PurchasedCoupons from "../Components/CustomerArea/PurchasedCoupons/PurchasedCoupons";
import { createAddActionPurchased, createDeleteActionPurchased, createFetchActionPurchased, purchasedCouponsStore } from "../Redux/PurchasedCoupons";

class CustomerService{

    public async getDetails(){
        // this.getAllPurchased();
        const response = axios.get<CustomerModel>(appConfig.customerUrl + "details");
        return (await response).data;
    }

    public async getOneCoupon (id:number){
        // this.getAllPurchased();
        const coupon = couponsStore.getState().coupons.find(coup => coup.id == id);
        if (typeof coupon === "undefined")
        return (await axios.get<CouponModel>(appConfig.customerUrl + "coupon/" + id)).data;
        else return coupon;
    }

    public async purchaseCoupon (coupon :CouponModel){
        // this.getAllPurchased();
        const response = axios.put<CouponModel>(appConfig.customerUrl + "purchase", coupon);
        const isPurchased = (await response).data;
        if (isPurchased != undefined ){
            purchasedCouponsStore.dispatch(createAddActionPurchased(isPurchased))
        }
        return (await response).data;
    }

    public async getAllCouponsPurchased (){
        if (purchasedCouponsStore.getState().purchasedCoupons.length == 0){
        const response = axios.get<CouponModel[]>(appConfig.customerUrl + "purchased");
        const purchased = (await response).data;
        purchasedCouponsStore.dispatch(createFetchActionPurchased(purchased));
        return (await response).data;
        }
        else{
            const purchasedList = purchasedCouponsStore.getState().purchasedCoupons;
            return purchasedList;
        }
    }

    public async getByCategory(cat:string){
        // this.getAllPurchased();
        if (couponsStore.getState().coupons.length == 0){
            
            
            const response = axios.get<CouponModel[]>(appConfig.customerUrl);
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
        // this.getAllPurchased();
        if (couponsStore.getState().coupons.length == 0){
            const response = axios.get<CouponModel[]>(appConfig.customerUrl + "maxprice/" + maxPrice);
            const coupons = (await response).data;
            couponsStore.dispatch (createFetchActionCoup(coupons));
            return coupons.filter (coup => coup.price <= maxPrice);
        }
        else{
            const couponsList = couponsStore.getState().coupons.filter (coup => coup.price <= maxPrice);
            return couponsList;
        }
    }


    public async deletePurchase (coupon:CouponModel){
        const response = await axios.put<CouponModel>(appConfig.customerUrl + "delete", coupon);
        const isCanceled = (await response).data;
        
        purchasedCouponsStore.dispatch(createDeleteActionPurchased(coupon.id))
        
    
    }

    public async getAllCoupons(){
        // this.getAllPurchased();

        
        if (couponsStore.getState().coupons.length == 0){
            const response = axios.get<CouponModel[]>(appConfig.customerUrl);
            couponsStore.dispatch(createFetchActionCoup((await response).data));

            return (await response).data;
        }
        else return couponsStore.getState().coupons;
    }

    public async getAllPurchased (){
        if (purchasedCouponsStore.getState().purchasedCoupons.length == 0){
            const responsePurchased = axios.get<CouponModel[]>(appConfig.customerUrl + "purchased");
        const purchased = (await responsePurchased).data;
        purchasedCouponsStore.dispatch(createFetchActionPurchased(purchased));
    }

    
    }
}







const customerService = new CustomerService();
export default customerService;


