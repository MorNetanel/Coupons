import "./Logo.css";
import couponLogo from "./logo.png"




function Logo(): JSX.Element {
    return (
        <div className="Logo">
			<img alt="Logo" src={couponLogo}    />
        </div>
    );
}

export default Logo;
