import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import jwtDecode from "jwt-decode";
import { UserModel } from "../Models/UserModel";




export class AuthState{

    public token: string = null;
    public user:any = null;
    
    constructor(){
        if(localStorage.getItem("token")){
            this.token = localStorage.getItem("token");
            const tokenObject = jwtDecode(this.token);
            this.user = tokenObject;
        }
    }
}

export enum AuthActionTypes{
    Login, Logout
}

export interface AuthAction{
    type:AuthActionTypes, 
    payload?:any
}

export function loginAction(token:string){
    return {type:AuthActionTypes.Login, payload:token}
}

export function logoutAction(){
    return {type:AuthActionTypes.Logout}
}

export function reducer(currentState = new AuthState(), action:AuthAction){
    const newState = {...currentState};

    switch(action.type){
        case AuthActionTypes.Login:
            
            newState.token = action.payload;
            localStorage.setItem("token", newState.token);
            const tokenObject: {user: UserModel} = jwtDecode(newState.token);
            
            
            newState.user = tokenObject;

           
            

           
            
            
        break;

        case AuthActionTypes.Logout:
            newState.token = null;
            newState.user = null;
            
            
            
            localStorage.removeItem("token");
            break;
    }
    return newState;
}

export const authStore = createStore(reducer, composeWithDevTools());

