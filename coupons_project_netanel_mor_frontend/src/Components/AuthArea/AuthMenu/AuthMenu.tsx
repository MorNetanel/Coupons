import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    function logout(){
        authService.logout();
        notificationService.success("Bye bye");
    }

    const [token, setToken] = useState<string>();
    useEffect(()=>{
        authStore.subscribe(()=>{
            setToken(authStore.getState().token);
        })
    }, [])
    
    return (
        <div className="AuthMenu">
			
           
            {!authStore.getState().token && 
                 <Link className="btn btn-outline-secondary btn-lg" to="/login">Login</Link>
            }
            {authStore.getState().token &&
             <Link className="btn btn-outline-secondary btn-lg" onClick={logout} to="/home">Logout</Link>}
           
           
        </div>
    );
}

export default AuthMenu;
