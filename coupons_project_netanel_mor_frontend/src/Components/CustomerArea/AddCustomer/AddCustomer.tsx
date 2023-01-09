import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import { createFetchActionCust, customersStore } from "../../../Redux/CustomerState";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CustomersDisplay from "../CustomersDisplay/CustomersDisplay";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<CustomerModel>();
    const navigate = useNavigate();

    function send(customer:CustomerModel){

    adminService.addCustomer(customer)
    
    
    .then(()=>{
        notificationService.success("Customer added!");
        customersStore.dispatch(createFetchActionCust([]));
        navigate("/admin/customers");
    })
    .catch(err => {notificationService.error(err);
    })
    }
    return (
        <div className="AddCustomer">
            <form onSubmit={handleSubmit(send)}>


                <label htmlFor="firstName">First Name: </label>
                <input type="text" id="firstName" {...register("firstName", {
                    required: {value: true, message: "Please insert your name"},
                    minLength: {value: 2, message: "Name must be at least 2 characters long"},
                    maxLength: {value: 20, message: "Name must be maximum 20 characters long"}
                })} /><br/>
                <span className="error">{formState.errors?.firstName?.message}</span><br/>


                <label htmlFor="lastName">Last Name: </label>

                <input type="text" id="lastName" {...register("lastName", {
                    required: {value: true, message: "Please insert last name"},
                    minLength: {value: 2, message: "last Name must be at least 2 characters long"},
                    maxLength: {value: 20, message: "Last name must be maximum 20 characters long"}
                })} /><br/>
                <span className="error">{formState.errors?.lastName?.message}</span><br/>

                <label htmlFor="email">Email: </label>

                <input type="email" id="email" {...register("email", {
                    required: {value: true, message: "Please insert email"},
                })} /><br/>
                <span className="error">{formState.errors?.email?.message}</span><br/>

                <label htmlFor="password">Password: </label>

                <input type="text" id="password" {...register("password", {
                    required: {value: true, message: "Please insert password"},
                    minLength: {value: 4, message: "Password must be at least 4 characters long"},
                    maxLength: {value: 30, message: "Password must be maximum 30 characters long"}
                })} /><br/>
                <span className="error">{formState.errors?.password?.message}</span><br/>

                <button >Add</button>

            </form>
			
        </div>
    );
}

export default AddCustomer;
