import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";

import notificationService from "../../../Services/NotificationService";
import "./AddCoupon.css";

function AddCoupon(): JSX.Element {

    const{register, handleSubmit, formState} = useForm<CouponModel>();
    const navigate = useNavigate();

    function send(coupon :CouponModel){
        coupon.image = (coupon.image as FileList[0]);
        companyService.addCoupon(coupon)
        .then(() =>{

           
                
            notificationService.success("Coupon added");
            navigate("/company/coupons");
            

        })
        .catch(err=>{
            notificationService.error(err);
            
            
        })
    }

    return (
        <div className="AddCoupon">
			<form onSubmit={handleSubmit(send)}>

                <label >Title: </label>
                <input   type="text" id ="title"{...register("title", {
                    required:{value:true, message:"Please enter title"},
                    minLength:{value:2, message:"Title must be at least 2 characters long"},
                    maxLength:{value:10, message:"Title must be maximum 10 characters long"}
                })} /> <br/>
                <span className="error">{formState.errors?.title?.message}<br/></span>

                
                <label >Category: </label>
                <select id="category" {...register("category")}>
                  <option value="FOOD">FOOD</option>
                  <option value="ELECTRICITY">ELECTRICITY</option>
                  <option value="RESTAURANT">RESTAURANT</option>
                  <option value="VACATION">VACATION</option>
                  <option value="OTHER">OTHER</option>
                </select> <br/><br/>

                <label >Amount: </label>
                <input type="number" id ="amount"{...register("amount", {
                    required:{value:true, message:"Please enter amount"}, 
                    min:{value:1, message:"Amount must be positive number"},
                    max:{value:500, message:"Amount must be maximum 500"}
                })} /> <br/>
                <span className="error">{formState.errors?.amount?.message}<br/></span>

                <label >Price: </label>
                <input type="number" id ="price" step="0.1" {...register("price", {
                    required:{value:true, message:"Please enter price"}, 
                    min:{value:0.1, message:"Price must be positive number"},
                    max:{value:2000, message:"Price must be maximum 2000"}
                })} /> <br/>
                <span className="error">{formState.errors?.price?.message}<br/></span>

                <label >Description: </label>
                <input type="text" id ="description"{...register("description", {
                    required:{value:true, message:"Please enter description"},
                    minLength:{value:10, message:"Description must be at least 10 characters long"},
                    maxLength:{value:150, message:"Description must be maximum 150 characters long"}
                })} /> <br/>
                <span className="error">{formState.errors?.description?.message}<br/></span>

                <label>End date: </label>
                <input type="date" id="endDate" {...register("endDate",{
                    required:{value:true, message:"Please insert end date"}
                })}/><br/>
                <span className="error">{formState.errors?.endDate?.message}</span> <br/>


            <input type="file" {...register("image", {
                required:{value:true, message:"Please load image file"}
            })}/> <br/><br/>
                <button>Add</button>
            </form>
        </div>
    );
}

export default AddCoupon;
