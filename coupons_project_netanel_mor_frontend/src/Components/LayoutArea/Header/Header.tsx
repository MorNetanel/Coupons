import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";

import "./Header.css";





function Header(): JSX.Element {
    return (
        <div className="Header">
          <div>
            
            <AuthMenu />
          </div>
          
          <h1 className="display-1">COUP COUPONS</h1>
            
            
        </div>
    );
}

export default Header;
