import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import AdminMenu from "../../AdminArea/AdminMenu/AdminMenu";
import CompanyMenu from "../../CompanyArea/CompanyMenu/CompanyMenu";
import CustomerMenu from "../../CustomerArea/CustomerMenu/CustomerMenu";
import "./Menu.css";

function Menu(): JSX.Element {

    const tokenDecoded = JSON.stringify(authStore.getState().user);

    const client = tokenDecoded.substring(tokenDecoded.indexOf("clienttype:")+1, tokenDecoded.lastIndexOf("iss"));
    
    return (
        <div className="Menu">

{!client && <>
        <nav className="navbar navbar-expand-lg -light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
           <div className="navbar-nav">
             <NavLink className="nav-link active" aria-current="page" to="/home">Home</NavLink>
             <NavLink className="nav-link active" aria-current="page" to="/aboutus">About Us </NavLink>

             </div>
          </div>
         </div>
            </nav>
            </>

            }
            {client.includes('ADMIN') && <>
            <AdminMenu/>
            </>}

            {client.includes('COMPANY') && <>
            <CompanyMenu/>
            </>}

            {client.includes('CUSTOMER') && <>
            <CustomerMenu/>
            </>}

            
        </div>
    );
}

export default Menu;
