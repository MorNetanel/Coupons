import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./DisplayCompany.css";

function DisplayCompany(): JSX.Element {

    const [company, setCompany] = useState<CompanyModel>();

    

    useEffect(() =>{
        companyService.getDetails()
        
        .then(comp => setCompany(comp))
        
        
        .catch(err => notificationService.error(err));
    }, []);


    return (
        <div className="DisplayCompany">
            
            {
                company && <>
			
                <h2>Company Name:</h2>
                <div>{company.name}</div>
    
                <h2>Email:</h2>
                <div>{company.email}</div>
                </>
               
            
            }
            
             
            
			
        </div>
    );
}

export default DisplayCompany;
