import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import CustomerModel from "../Models/CustomerModel";


export class CustomerState{
    public customers:CustomerModel[] = [];
}

export enum CustomerActionType{
    FetchCustomer, AddCustomer, EditCustomer, DeleteCustomer
}

export interface CustomerAction{
    type:CustomerActionType, 
    payload:any
}

export function createFetchActionCust(customers:CustomerModel[]){
    return {type:CustomerActionType.FetchCustomer, payload:customers};
}
export function createAddActionCust(customer:CustomerModel){
    return{type:CustomerActionType.AddCustomer, payload:customer};
}
export function createEditActionCust(customer:CustomerModel){
    return {type:CustomerActionType.EditCustomer, payload:customer};
}
export function createDeleteActionCust(id:number){
    return {type:CustomerActionType.DeleteCustomer, payload:id};
}

export function customersReducer(currentState = new CustomerState(), action:CustomerAction): CustomerState{

    const newState = {...currentState};

    switch(action.type){

        case CustomerActionType.FetchCustomer:
            newState.customers = action.payload;
        break;
        
        case CustomerActionType.AddCustomer:
            newState.customers.push(action.payload);
        break;

        case CustomerActionType.EditCustomer:
            const indexToEdit = newState.customers.findIndex(customer=>customer.id == action.payload.id);
            if (indexToEdit > 0)
            newState.customers[indexToEdit] = action.payload;
        break;

        case CustomerActionType.DeleteCustomer:
            
            
            const indexToDelete = newState.customers.findIndex(customers=>customers.id == action.payload);
            if (indexToDelete >= 0)
            newState.customers.splice(indexToDelete, 1);
            break;

    }
    return newState
}

export const customersStore = createStore(customersReducer, composeWithDevTools());

