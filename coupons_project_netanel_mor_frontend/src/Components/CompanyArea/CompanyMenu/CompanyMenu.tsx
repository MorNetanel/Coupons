import { NavLink } from "react-router-dom";
import "./CompanyMenu.css";

function CompanyMenu(): JSX.Element {
    return (
        <div className="CompanyMenu">
			   
         <nav className="navbar navbar-expand-lg -light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
           <div className="navbar-nav">
             <NavLink className="nav-link active" aria-current="page" to="/aboutus">About Us</NavLink>
             <NavLink className="nav-link active" aria-current="page" to="/company/details">Company Details </NavLink>
             <NavLink className="nav-link active" aria-current="page"  to="/company/coupons">Company's Coupons </NavLink>
             </div>
          </div>
         </div>
            </nav>
        </div>
           
            
            
        
    );
}

export default CompanyMenu;

