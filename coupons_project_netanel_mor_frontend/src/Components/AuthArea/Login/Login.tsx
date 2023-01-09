import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Login.css";

function Login(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<CredentialsModel>();
    const navigate = useNavigate();

    function send(credentials: CredentialsModel){
        
        
        authService.login(credentials)
        .then( () =>{
            
            notificationService.success("Hello ");
            navigate("/home")
            
        })
        .catch(err => notificationService.error(err))
    }



    
    return (

        
        <div className="Login">
            <div className="container-lg forml">
                <form onSubmit={handleSubmit(send)}>
                    
                    <input className="form-control" placeholder="email" {...register("email", {
                        required:{value:true, message:"Please insert email"}, 
                        minLength:{value:3, message:"Email invalid, please insert currect email"}, 
                        maxLength:{value:15, message:"Email must be maximum 15 characters long"}
                    })} />
                     <span className="error">{formState.errors?.email?.message}</span><br/><br/>
                    <input type="password" className="form-control" placeholder="password" {...register("password" , {
                        required:{value:true, message:"Please insert password"}, 
                        minLength:{value:2, message:"Password must be at least 2 characters long"}, 
                        maxLength:{value:15, message:"Email must be maximum 15 characters long"}
                    })}/>
                     <span className="error">{formState.errors?.password?.message}</span><br/><br/>
                    <label>Rule: </label>
                    <select name="role" className="form-select form-select-sm" aria-label=".form-select-sm example"{...register("clientType")} >
                        <option value="ADMIN">Administrator</option>
                        <option value="COMPANY">Company</option>
                        <option value="CUSTOMER">Customer</option>
                    </select><br/><br/>
                    <button type="submit" className="btn btn-outline-secondary">Login</button>
                    
                </form>
            </div>
        </div>
    );
}

export default Login;
