import { config } from "process";
import { NavLink } from "react-router-dom";
import "./AdminMenu.css";

function AdminMenu(): JSX.Element {
    return (
        <div className="AdminMenu">
            <div className="NavMenu">
        <nav className="navbar navbar-expand-lg -light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
           <div className="navbar-nav">
             <NavLink className="nav-link active" aria-current="page" to="/home">Home</NavLink>
             <NavLink className="nav-link active" aria-current="page" to="/aboutus">About Us </NavLink>
             <NavLink className="nav-link active" aria-current="page"  to="/admin/companies">Companies </NavLink>
             <NavLink className="nav-link active" aria-current="page"  to="/admin/customers">Customers </NavLink>
             </div>
          </div>
         </div>
            </nav>
            </div>
        </div>
    );
}

export default AdminMenu;
