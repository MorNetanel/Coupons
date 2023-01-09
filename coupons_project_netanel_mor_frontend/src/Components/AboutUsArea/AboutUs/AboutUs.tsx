import "./AboutUs.css";
import couponssite from  "./couponsSite.jpg";


function AboutUs(): JSX.Element {
    return (
        <div className="AboutUs">
			<h2>Netanel Mor is a Java full stack developer with passion to write code! </h2>
            <h2>I developed a Coupons Management System that allows advertising, 
                marketing, and purchasing of commercial coupons, developed both front and back-end.<br/>
                Below seen the site sketch
                
                </h2>

                <img src={couponssite} alt="Coupons Site sketch" />
            
            
              </div>
    );
}

export default AboutUs;
