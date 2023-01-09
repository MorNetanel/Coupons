import { Link } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import DisplayCouponForCompany from "../../CompanyArea/DisplayCouponForCompany/DisplayCouponForCompany";
import Logo from "../../LayoutArea/Logo/Logo";
import "./CouponCard.css";

interface CouponProperties{
    coupon:CouponModel
}
function CouponCard(props:CouponProperties): JSX.Element {

    
    const tokenDecoded = JSON.stringify(authStore.getState().user);

    const client = tokenDecoded.substring(tokenDecoded.indexOf("clienttype:")+1, tokenDecoded.lastIndexOf("iss"));

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
        <div className="CouponCard ">
            
            
            
                    {authStore.getState().token == null && <>





                        <div className="card" >
  
  <div className="card-body">
    <h5 className="card-title"> {props.coupon.title}</h5>
    <p className="card-text">{props.coupon.description}</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Category: {props.coupon.category}</li>
    <li className="list-group-item">Price: {props.coupon.price} $</li>
    <li className="list-group-item">Only {props.coupon.amount} coupons left</li>
  </ul>
  <img className="card-img-top" src={URL.createObjectURL(convertDataUrlToBlob(props.coupon.image))} alt="Card image cap"/>

  </div>




                    </>}


                    {client.includes("ADMIN") && <>
                    <div className="card" >
  
  <div className="card-body">
    <h5 className="card-title"> {props.coupon.title}</h5>
    <p className="card-text">{props.coupon.description}</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Category: {props.coupon.category}</li>
    <li className="list-group-item">Price: {props.coupon.price} $</li>
    <li className="list-group-item">Only {props.coupon.amount} coupons left</li>
    <li className="list-group-item">End date: {props.coupon.endDate.toString()} </li>
  </ul>
  <img className="card-img-top" src={URL.createObjectURL(convertDataUrlToBlob(props.coupon.image))} alt="Card image cap"/>

  </div>
                    </>}


                    {client.includes("COMPANY") && <>
                    <div className="card" >
  <img className="card-img-top" src={URL.createObjectURL(convertDataUrlToBlob(props.coupon.image))} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title"> {props.coupon.title}</h5>
    <p className="card-text">{props.coupon.description}</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Category: {props.coupon.category}</li>
    <li className="list-group-item">Price: {props.coupon.price} $</li>
    <li className="list-group-item">Only {props.coupon.amount} coupons left</li>
    <li className="list-group-item">End date: {props.coupon.endDate.toString()} </li>
  </ul>
  <div className="card-body">
    <Link to={"/company/coupon/" + props.coupon.id}>Show  Details</Link>
    
  </div>
</div>
                    </>}

                    {client.includes("CUSTOMER") && <>
                    
                    


<div className="card" >
  <img className="card-img-top" src={URL.createObjectURL(convertDataUrlToBlob(props.coupon.image))} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title"> {props.coupon.title}</h5>
    <p className="card-text">{props.coupon.description}</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Category: {props.coupon.category}</li>
    <li className="list-group-item">Price: {props.coupon.price} $</li>
    <li className="list-group-item">Only {props.coupon.amount} coupons left</li>
    <li className="list-group-item">End date: {props.coupon.endDate.toString()} </li>
  </ul>
  <div className="card-body">
    <Link to={"/customer/coupon/" + props.coupon.id}>Show  Details</Link>
    
  </div>
</div>
                    </>}

                   
            
                    

                 


                    
               

                
                
        </div>
    );
}

export default CouponCard;
