import CouponModel from "../../../Models/CouponModel";
import "./PurchasedCoupons.css";
import { useEffect, useState } from "react";
import notificationService from "../../../Services/NotificationService";
import customerService from "../../../Services/CustomerService";
import CouponCard from "../../CouponsArea/CouponCard/CouponCard";
function PurchasedCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    useEffect(()=>{
        customerService.getAllCouponsPurchased()
        .then(coupons => setCoupons(coupons))
        .catch(err => notificationService.error(err));

    }, []);
    return (
        <div className="PurchasedCoupons">
            <h2>Purchased Coupons</h2>
             {coupons.map(coup => <CouponCard key={coup.id} coupon={coup}/>)}

        </div>
    );
}

export default PurchasedCoupons;
