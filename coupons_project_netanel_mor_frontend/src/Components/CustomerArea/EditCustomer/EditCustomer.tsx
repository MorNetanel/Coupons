import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import { customersStore } from "../../../Redux/CustomerState";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./EditCustomer.css";
import { useEffect } from "react";

function EditCustomer(): JSX.Element {

    const {register, handleSubmit, formState, setValue} = useForm<CustomerModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id!;

    useEffect(()=>{
        adminService.getOneCustomer(id)
        .then(customer => {
            setValue("firstName", customer.firstName);
            setValue("lastName", customer.lastName);
            setValue("email", customer.email);
            setValue("password", customer.password);
            
            
        })
        .catch(err =>notificationService.error(err))
    }, [])

    function send (customer :CustomerModel){
        customer.id = id;
        console.log(customer);
        
        adminService.updateCustomer(customer)
        .then(() =>{
            notificationService.success("Customer Updated");
            navigate("/admin/customer/" + id)
        })
        .catch(err => notificationService.error(err))
    }


    return (
        <div className="EditCustomer">

            <form onSubmit={handleSubmit(send)}>
                <label>First Name: </label>
                <input type="text" id="firstName" {...register("firstName", {
                    required: {value: true, message: "First name required"},
                    minLength: {value: 1, message: "First name must be at least 2 characters long"},
                    maxLength: {value: 10, message: "First name must be maximum 10 characters long"}
                })} /><br/>
                <span className="error">{formState.errors?.firstName?.message}</span>

                <label>Last Name: </label>
                <input type="text" id="lastName" {...register("lastName",{
                    required: {value: true, message: "Last name required"},
                    minLength: {value: 1, message: "Last name must be at least 2 characters long"},
                    maxLength: {value: 10, message: "Last name must be maximum 10 characters long"}
                })} /><br/>
                <span className="error">{formState.errors?.lastName?.message}</span>

                <label>Email: </label>
                <input type="email" id="email" {...register("email",{
                    
                })} /><br/>
                <span className="error">{formState.errors?.email?.message}</span><br/>

                <label>Password: </label>
                <input type="text" id="password" {...register("password",{
                    required: {value: true, message: "Password required"},
                    minLength: {value: 3, message: "Password must be at least 4 characters long"},
                    maxLength: {value: 20, message: "Last name must be maximum 20 characters long"}
                })} /><br/>
                <span className="error">{formState.errors?.password?.message}</span>

                
                <button>Edit</button>
            </form>
			
        </div>
    );
}

export default EditCustomer;
