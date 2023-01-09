import axios from "axios";
import { CredentialsModel } from "../Models/CredentialsModel";
import { authStore, loginAction, logoutAction } from "../Redux/AuthState";
import { couponsStore, createClearActionCoup } from "../Redux/CouponsState";
import appConfig from "../Util/Config";

class AuthService{

    public async login(credentials:CredentialsModel){
        const response = axios.post<string>(appConfig.loginUrl, credentials);
        const token = (await response).data;
        authStore.dispatch(loginAction(token));
        
    }





    public logout(){
        authStore.dispatch(logoutAction());
        couponsStore.dispatch(createClearActionCoup());
        
    }
}

const authService = new AuthService();
export default authService;