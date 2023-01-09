import "./Home.css";
import {useEffect, useState} from "react";
import CouponModel from "../../../Models/CouponModel";
import CouponCard from "../../CouponsArea/CouponCard/CouponCard";
import notificationService from "../../../Services/NotificationService";
import homeService from "../../../Services/HomeService";
import { authStore } from "../../../Redux/AuthState";
import Admin from "../../AdminArea/Admin/Admin";
import { UserModel } from "../../../Models/UserModel";
import Customer from "../../CustomerArea/CustomerDetails/CustomerDetails";
import Company from "../../CompanyArea/CompanyDetails/CompanyDetails";
import CouponsDisplay from "../../CouponsArea/CouponsDisplay/CouponsDisplay";
import { Navigate, useNavigate } from "react-router-dom";
import { couponsStore, createClearActionCoup } from "../../../Redux/CouponsState";

function Home(): JSX.Element {

   
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    useEffect( () => {
        homeService.getCouponsOffLine()
        .then(coupons => setCoupons(coupons))
        .catch(err => notificationService.error(err));
    },[]);

    
    const [token, setToken] = useState<string>();
    useEffect(()=>{
        authStore.subscribe(()=>{
            setToken(authStore.getState().token);
        })
    }, [])

   

    const [clientType , setClientType] = useState<string>();
    useEffect(()=>{
        authStore.subscribe(()=>{
            setClientType(JSON.stringify(authStore.getState().user));
        })
    },[])

    const tokenDecoded = JSON.stringify(authStore.getState().user);

    const client = tokenDecoded.substring(tokenDecoded.indexOf("clienttype:")+1, tokenDecoded.lastIndexOf("iss"));

    const navigate = useNavigate();
    if(client.includes("COMPANY")){
    navigate("/company/coupons")}

    if(client.includes("CUSTOMER")){
        navigate("/customer")}

    

    
    
    

    
    return (
        <div className="Home">

             {!authStore.getState().token   && <>
			<h2>Welcome! Coupons are not available at home page.</h2></>}

            
            
            

              

            <div >{coupons.map( coupon => <CouponCard key={coupon.id} coupon = {coupon} />)}</div>

            
        </div>
    );
}

export default Home;
