import { getValue } from "@testing-library/user-event/dist/utils";
import { config } from "process";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import { couponsStore, createClearActionCoup } from "../../../Redux/CouponsState";
import companyService from "../../../Services/CompanyService";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../CouponCard/CouponCard";
import "./CouponsDisplay.css";


function CouponsDisplay(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const navigate = useNavigate();

    const tokenDecoded = JSON.stringify(authStore.getState().user);

    const client = tokenDecoded.substring(tokenDecoded.indexOf("clienttype:")+1, tokenDecoded.lastIndexOf("iss"));

    const [price, setCouponsPrice] = useState<number>();

    const [category, setCategory] = useState<string>();

    useEffect(()=>{
        if(client.includes("CUSTOMER")){
            if (price === undefined){
                customerService.getAllCoupons()
                .then(coupons => setCoupons(coupons))
        .catch(err => notificationService.error(err));
            } else
        customerService.getByMaxPrice(price)
        .then(coupons => setCoupons(coupons))
        .catch(err => notificationService.error(err));
        }
        else if (client.includes("COMPANY")){
            companyService.getByMaxPrice(price)
            .then(coupons => setCoupons(coupons))
            .catch(err => notificationService.error(err));
            }
    }, [price ]);

    useEffect(() =>{
        if(client.includes("COMPANY")){
            if (category == "ALL"){ companyService.getCoupons()
                .then(coupons => setCoupons(coupons))
        .catch(err => notificationService.error(err));      
            }
            else
            companyService.getByCategory(category)
            .then(coupons => setCoupons(coupons))
        .catch(err => notificationService.error(err));
        } else if(client.includes("CUSTOMER")){
            if (category == "ALL"){ customerService.getAllCoupons()
                .then(coupons => setCoupons(coupons))
        .catch(err => notificationService.error(err));
            }
            else
            customerService.getByCategory(category)
            .then(coupons => setCoupons(coupons))
        .catch(err => notificationService.error(err));
        }
    }, [ category ] );

    useEffect(()=>{
        if(client.includes("COMPANY")){
            couponsStore.dispatch(createClearActionCoup());
        companyService.getCoupons()
        .then(coupons => setCoupons(coupons)
        )
        .catch(err => notificationService.error(err));
        } else if(client.includes("CUSTOMER")){
            customerService.getAllCoupons()
            .then(coupons => setCoupons(coupons))
            .catch(err => notificationService.error(err));
            }
    }, []);

   

    

    

    

    
    

    function goToAdd(){
        navigate("/company/add");
    }
    return (
        <div className="CouponsDisplay">
            
            {client.includes("COMPANY") &&
            <>
            <div><button type="button" className="btn btn-outline-secondary" onClick={goToAdd}>ADD COUPON</button></div>

            

                <div className="price">
                <label htmlFor="customRange3" className="form-label">Price</label>
                <input onChange={(p) => setCouponsPrice(+p.target.value)} type="range" className="form-range" min="0" max="2000"  id="customRange3"/>
                <span className="price">{price}</span><br/>
                {/* <button  onClick={searchPriceForCompany} className="search price">Search</button> */}
                </div>


                
                


                             

<form>
            

                <select name="category" className="category" onChange={(cat) =>setCategory(cat.target.value) } >
                
                <option value="ALL">Select Category</option>
                {/* <option value="ALL">All Categories</option> */}
                    <option value="FOOD">FOOD</option>
                    <option value="ELECTRICITY">ELECTRICITY</option>
                    <option value="RESTAURANT">RESTAURANT</option>
                    <option value="VACATION">VACATION</option>
                    <option value="OTHER">OTHER</option>
                </select>

            {/* <button onClick={searchByCategoryForCompany} className="search">Search by category</button> */}


            </form>
            {coupons.map(coup => <CouponCard key={coup.id} coupon={coup}/>)}

            </>}








            {client.includes("CUSTOMER") &&
            <>
            <div className="price">
                <label htmlFor="customRange3" className="form-label">Price</label>
                <input onChange={(p) => setCouponsPrice(+p.target.value)} type="range" className="form-range" min="0" max="2000"  id="customRange3"/>
                <span className="price">{price}</span><br/>
                {/* <button  onClick={searchPriceForCustomer} className="search price">Search</button> */}
                </div>


            <form>
            <select name="category" className="category" onChange={(cat) =>setCategory(cat.target.value) } >
                
                <option value="ALL">Select Category</option>
                {/* <option value="ALL">All Categories</option> */}
                    <option value="FOOD">FOOD</option>
                    <option value="ELECTRICITY">ELECTRICITY</option>
                    <option value="RESTAURANT">RESTAURANT</option>
                    <option value="VACATION">VACATION</option>
                    <option value="OTHER">OTHER</option>
                </select>

            {/* <button onClick={searchByCategoryForCustomer} className="search">Search by category</button> */}


            </form>



                
            {coupons.map(coup => <CouponCard key={coup.id} coupon={coup}/>)}
            
           
            </>}

			</div>
    );
}

export default CouponsDisplay;
