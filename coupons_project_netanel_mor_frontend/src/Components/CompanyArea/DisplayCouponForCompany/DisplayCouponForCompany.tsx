import { Link, useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import "./DisplayCouponForCompany.css";
import { useEffect, useState } from "react";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import { couponsStore, createFetchActionCoup } from "../../../Redux/CouponsState";

function DisplayCouponForCompany(): JSX.Element {

    const [coupon, setCoupon] = useState<CouponModel>();
    const params = useParams();
    const id = +params.id!;

    const navigate = useNavigate();

    useEffect( ()=>{
        companyService.getOneCoupon(id)
        .then(coupon => setCoupon(coupon))
        .catch(err=>notificationService.error(err))
    }, []);

    function deleteCoupon(){
        if(window.confirm("Delete Coupon?")){
            companyService.deleteCoupon(id)
            .then(() =>{
                notificationService.success("Coupon Deleted");
                couponsStore.dispatch(createFetchActionCoup([]));
                navigate("/company/coupons");
            })
            .catch( err=>notificationService.error(err) )
        }
    }
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


    return (
        <div className="DisplayCouponForCompany">
            
			{coupon && <>
            <h2>Title:<br/> {coupon.title} <br/></h2>
            
            <h3>Description: <br/>
            {coupon.description}<br/></h3>
            <h3>Category:<br/>
            {coupon.category}<br/></h3>
            <h3>Price: <br/>
            {coupon.price} $<br/></h3>
            <h3>Amount:    <br/>
            {coupon.amount}
            </h3>
            <h3>Start Date: <br/>
            {coupon.startDate.toString()}<br/></h3>
            <h3>End Date: <br/>
            {coupon.endDate.toString()}<br/></h3>

            

          

            <img src={URL.createObjectURL(convertDataUrlToBlob(coupon.image))}/><br/>
           
            <Link className="link" to={"/company/updatecoupon/" + id}>Edit Coupon</Link><br/>
            <Link className="link" to="" onClick={deleteCoupon} >Delete Coupon</Link>

            </>}
        </div>
    );
}

export default DisplayCouponForCompany;
