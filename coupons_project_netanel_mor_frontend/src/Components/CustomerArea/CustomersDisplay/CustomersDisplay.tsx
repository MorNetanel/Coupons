import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CustomersCard from "../CustomersCard/CustomersCard";
import "./CustomersDisplay.css";

function CustomersDisplay(): JSX.Element {

    const [customers, setCustomers] = useState<CustomerModel[]>([]);

    const navigate = useNavigate();

    useEffect(()=>{
        adminService.getCustomers()
        .then(customers => setCustomers(customers))
        .catch(err => notificationService.error(err));
    },[]);

    function goToAdd(){
        navigate("/admin/customer");
    }
    return (
        <div className="CustomersDisplay ">
            <div><button type="button" className="btn btn-outline-secondary"onClick={goToAdd}> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
             <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg> ADD CUSTOMER</button></div>
			{customers.map( customer => <CustomersCard key={customer.id} customer= {customer}/>)}
        </div>
    );
}

export default CustomersDisplay;
