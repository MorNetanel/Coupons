import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { forEachChild } from "typescript";
import CouponModel from "../../../Models/CouponModel";
import { purchasedCouponsStore } from "../../../Redux/PurchasedCoupons";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./DisplayCouponForCustomer.css";

function DisplayCouponForCustomer(): JSX.Element {

    const [coupon, setCoupon] = useState<CouponModel>();
    const params = useParams();
    const id = +params.id!;

    const navigate = useNavigate();

    useEffect( () =>{
        customerService.getOneCoupon(id)
        .then(coupon => {
            setCoupon(coupon);
        })
        .catch(err=>console.log(err))
        
    }, []);

    function convertDataUrlToBlob(dataUrl: any): Blob {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
    
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
    
        return new Blob([u8arr], {type: mime});
    }

    function purchaseCoupon (){
        customerService.purchaseCoupon(coupon)
        .then(() =>{
            notificationService.success("Coupon purchased");
            setTimeout(() =>{navigate("/customer/purchased")}, 300);
        })
        .catch(err=>{
            notificationService.error(err);
        })
    }

    function purchased() :boolean{
        const purchasedCoupons = purchasedCouponsStore.getState().purchasedCoupons;
        var boole :boolean = false;
        purchasedCoupons.forEach(coup =>{
            if(isCouponEqual(coup, coupon))
            boole = true;
        
        });     
        return boole;
    }
        function isCouponEqual(Coupon1 : CouponModel , Coupon2 : CouponModel){
            return Coupon1.id === Coupon2.id;
        }

        function cancelPurchase (){
            customerService.deletePurchase(coupon)
            .then( () =>{
                notificationService.success("Purchase Cancel")
                setTimeout(() =>{navigate("/customer/purchased")}, 300);
            })
            .catch(err=>{
                notificationService.error(err);
            })
        }


        
    

    return (
        <div className="DisplayCouponForCustomer">

            {coupon && <>
               
            <h2>Title:<br/> {coupon.title} <br/></h2>
            <h3>Description: <br/>
            {coupon.description}<br/></h3>
            <h3>Category:<br/>
            {coupon.category}<br/></h3>
            <h3>Price: <br/>
            {coupon.price} $<br/></h3>
            <h3>Amount: <br/>
            {coupon.amount}<br/></h3>
            <h3>Start Date: <br/>
            {coupon.startDate.toString()}<br/></h3>
            <h3>End Date: <br/>
            {coupon.endDate.toString()}<br/></h3>
            <img src={URL.createObjectURL(convertDataUrlToBlob(coupon.image))}/><br/>
           

                { ! purchased()&&   <>
            <button onClick={purchaseCoupon}>Purchase Coupon</button>
            </>}

            { purchased() && <>
                <button onClick={cancelPurchase}>Cancel Purchase</button>
            </>
            }
            
            
            </>}

			
        </div>
    );
}

export default DisplayCouponForCustomer;
