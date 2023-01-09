import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import { companiesStore, createFetchActionComp } from "../../../Redux/CompanyState";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./AddCompany.css";

function AddCompany(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<CompanyModel>();
    const navigate = useNavigate();

    function send (company:CompanyModel){
        adminService.addCompany(company)
        .then(()=>{
            notificationService.success("Company added!");
            companiesStore.dispatch(createFetchActionComp([]));
            navigate("/admin/companies");
        })
        .catch(err => {notificationService.error(err);
        })
    }
    return (
        <div className="AddCompany">
            <form onSubmit={handleSubmit(send)}>

            <label htmlFor="name">Company name: </label>
                <input type="text" id="name" {...register("name", {
                    required: {value: true, message: "Please insert company name"},
                    minLength: {value: 2, message: "Name must be at least 2 characters long"},
                    maxLength: {value: 20, message: "Name must be maximum 20 characters long"}
                })} /><br/>
                <span className="error">{formState.errors?.name?.message}</span><br/>

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

export default AddCompany;
