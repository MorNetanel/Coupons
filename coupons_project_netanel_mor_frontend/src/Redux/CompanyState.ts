import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import CompanyModel from "../Models/CompanyModel";

export class CompanyState{
    public companies:CompanyModel[] = [];
}

export enum CompanyActionType{
    FetchCompany, AddCompany, EditCompany, DeleteCompany
}

export interface CompanyAction{
    type:CompanyActionType, 
    payload:any
}

export function createFetchActionComp(companies:CompanyModel[]){
    return {type:CompanyActionType.FetchCompany, payload:companies};
}
export function createAddActionComp(company:CompanyModel){
    return{type:CompanyActionType.AddCompany, payload:company};
}
export function createEditActionComp(company:CompanyModel){
    return {type:CompanyActionType.EditCompany, payload:company};
}
export function createDeleteActionComp(id:number){
    return {type:CompanyActionType.DeleteCompany, payload:id};
}

export function companiesReducer(currentState = new CompanyState(), action:CompanyAction): CompanyState{

    const newState = {...currentState};

    switch(action.type){

        case CompanyActionType.FetchCompany:
            newState.companies = action.payload;
        break;
        
        case CompanyActionType.AddCompany:
            newState.companies.push(action.payload);
        break;

        case CompanyActionType.EditCompany:
            const indexToEdit = newState.companies.findIndex(company=>company.id == action.payload.id);
            if (indexToEdit > 0)
            newState.companies[indexToEdit] = action.payload;
        break;

        case CompanyActionType.DeleteCompany:

            const indexToDelete = newState.companies.findIndex(company=>company.id == action.payload);
            if (indexToDelete >= 0)
            newState.companies.splice(indexToDelete, 1);
            break;

    }
    return newState
}

export const companiesStore = createStore(companiesReducer, composeWithDevTools());

