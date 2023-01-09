import CustomerModel from "../../../Models/CustomerModel";
import "./DisplayCustomer.css";
import { useEffect, useState } from "react";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";

function DisplayCustomer(): JSX.Element {

    const [customer, setCustomer] = useState<CustomerModel>();

    useEffect(() =>{
        customerService.getDetails()
        .then(cust =>setCustomer(cust))
        .catch(err => notificationService.error(err));
    }, []);
    return (
        <div className="DisplayCustomer">

            {customer &&<>
            <h2>First Name: </h2>
            <div>{customer.firstName}</div>

            <h2>Last Name: </h2>
            <div>{customer.lastName}</div>

            <h2>Email: </h2>
            <div>{customer.email}</div>

            
            
            </>}
			
        </div>
    );
}

export default DisplayCustomer;
