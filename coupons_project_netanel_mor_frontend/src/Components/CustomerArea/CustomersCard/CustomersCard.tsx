import { Link } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import "./CustomersCard.css";



interface CustomerProps{
    customer:CustomerModel
}
function CustomersCard(props:CustomerProps): JSX.Element {
    return (
        <div className="CustomersCard box">
            <Link to={"/admin/customer/" + props.customer.id}>
                <div>
                    
                    
                    <span>{props.customer.firstName  +" "} 
                    {props.customer.lastName}</span><br/>
                    
                    <span>{props.customer.email}</span>
                </div>
            </Link>
			
        </div>
    );
}

export default CustomersCard;
