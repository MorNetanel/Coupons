import { Link, NavLink } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import "./CompanyCard.css";

interface CompanyProps{
    company: CompanyModel
}

function CompanyCard(props:CompanyProps): JSX.Element {
    return (
        <div className="CompanyCard box">

            <Link to={"/admin/company/" + props.company.id}>
                <div>
                   
                    <span>{props.company.name +" "} 
                    </span>
                </div>
                </Link>
            

            
			
        </div>
    );
}

export default CompanyCard;
