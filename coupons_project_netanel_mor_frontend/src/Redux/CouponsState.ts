import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";


export class CouponsState{
    public coupons:CouponModel[] = [];
}

export enum CouponsActionType{
    FetchCoupons, AddCoupon, EditCoupon, DeleteCoupon, ClearCoupons
}
export interface CouponsAction {
    type: CouponsActionType, 
    payload?: any
}

export function createFetchActionCoup(coupons:CouponModel[]){
    return {type:CouponsActionType.FetchCoupons, payload:coupons};
}
export function createAddActionCoup(coupon:CouponModel){
    return{type:CouponsActionType.AddCoupon, payload:coupon};
}
export function createEditActionCoup(coupon:CouponModel){
    return {type:CouponsActionType.EditCoupon, payload:coupon};
}
export function createDeleteActionCoup(id:number){
    return {type:CouponsActionType.DeleteCoupon, payload:id};
}

export function createClearActionCoup (){
    return {type:CouponsActionType.ClearCoupons};
}

export function couponsReducer(currentState = new CouponsState(), action:CouponsAction): CouponsState{

    const newState = {...currentState};

    switch(action.type){

        case CouponsActionType.FetchCoupons:
            newState.coupons = action.payload;
        break;
        
        case CouponsActionType.AddCoupon:
            newState.coupons.push(action.payload);
        break;

        case CouponsActionType.EditCoupon:
            const indexToEdit = newState.coupons.findIndex(coupon=>coupon.id == action.payload.id);
            if (indexToEdit > 0)
            newState.coupons[indexToEdit] = action.payload;
        break;

        case CouponsActionType.DeleteCoupon:
            
            
            const indexToDelete = newState.coupons.findIndex(coupon=>coupon.id == action.payload);
            if (indexToDelete >= 0)
            newState.coupons.splice(indexToDelete, 1);
            break;

        case CouponsActionType.ClearCoupons:
            newState.coupons = [];
            break;
    }
    return newState
}

export const couponsStore = createStore(couponsReducer , composeWithDevTools());