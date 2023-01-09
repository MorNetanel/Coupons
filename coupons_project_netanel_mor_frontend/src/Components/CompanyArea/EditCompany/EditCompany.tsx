import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import "./EditCompany.css";
import { useEffect } from "react";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";

function EditCompany(): JSX.Element {

    const {register, handleSubmit, formState, setValue} = useForm<CompanyModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id!;

    useEffect(()=>{
        adminService.getOneCompany(id)
        .then(company =>{
            setValue("name", company.name);
            setValue("email", company.email);
            setValue("password", company.password);
        })
        .catch(err =>notificationService.error(err))
    }, [])

    function send (company:CompanyModel){
        company.id = id;
        console.log(company);
        adminService.updateCompany(company)
        
        
        .then(() =>{
            notificationService.success("Company Updated");
            navigate("/admin/company/" + id)
        })
        .catch(err => notificationService.error(err))
    }


    return (
        <div className="EditCompany">
			<form onSubmit={handleSubmit(send)}>
                <label>Company Name: </label>
                <input type="text" id="name" {...register("name", {
                    required: {value: true, message: "Name required"},
                    minLength: {value: 1, message: "Name must be at least 2 characters long"},
                    maxLength: {value: 10, message: "Name must be maximum 10 characters long"}
                })} /><br/>
                <span className="error">{formState.errors?.name?.message}</span>


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

export default EditCompany;
