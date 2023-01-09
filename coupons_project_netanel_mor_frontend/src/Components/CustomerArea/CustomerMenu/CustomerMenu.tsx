import { NavLink } from "react-router-dom";
import "./CustomerMenu.css";

function CustomerMenu(): JSX.Element {
    return (
        <div className="CustomerMenu">
			<NavLink className="CustomerMenu" to="/aboutus">About Us</NavLink>
            <NavLink className="CustomerMenu" to="/customer/details">Customer Details</NavLink>
            <NavLink className="CustomerMenu" to="/customer/purchased">My Coupons</NavLink>
            <NavLink className="CustomerMenu" to="/customer">All Coupons</NavLink>
            
        </div>
    );
}

export default CustomerMenu;
