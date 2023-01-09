import { Navigate, Route, Routes } from "react-router-dom";
import AboutUs from "../../AboutUsArea/AboutUs/AboutUs";
import Login from "../../AuthArea/Login/Login";
import AddCompany from "../../CompanyArea/AddCompany/AddCompany";
import CompaniesDisplay from "../../CompanyArea/CompaniesDisplay/CompaniesDisplay";
import AddCoupon from "../../CouponsArea/AddCoupon/AddCoupon";
import AddCustomer from "../../CustomerArea/AddCustomer/AddCustomer";
import CustomersDisplay from "../../CustomerArea/CustomersDisplay/CustomersDisplay";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";
import Customer from "../../CustomerArea/CustomerDetails/CustomerDetails";
import Company from "../../CompanyArea/CompanyDetails/CompanyDetails";
import EditCustomer from "../../CustomerArea/EditCustomer/EditCustomer";
import EditCompany from "../../CompanyArea/EditCompany/EditCompany";
import DisplayCompany from "../../CompanyArea/DisplayCompany/DisplayCompany";
import CouponsDisplay from "../../CouponsArea/CouponsDisplay/CouponsDisplay";
import DisplayCouponForCompany from "../../CompanyArea/DisplayCouponForCompany/DisplayCouponForCompany";
import DisplayCustomer from "../../CustomerArea/DisplayCustomer/DisplayCustomer";
import DisplayCouponForCustomer from "../../CustomerArea/DisplayCouponForCustomer/DisplayCouponForCustomer";
import PurchasedCoupons from "../../CustomerArea/PurchasedCoupons/PurchasedCoupons";
import EditCoupon from "../../CouponsArea/EditCoupon/EditCoupon";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
            
            <Route path="/home" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />


            <Route path="/admin/customers" element={<CustomersDisplay />} />
            <Route path="/admin/companies" element={<CompaniesDisplay />} />
            <Route path="/admin/customer" element={<AddCustomer />} />
            <Route path="/admin/company" element={<AddCompany />} />
            <Route path="/admin/customer/:id" element={<Customer/>} />
            <Route path="/admin/company/:id" element={<Company/>} />
            <Route path="/admin/editcustomer/:id" element={<EditCustomer/>} />
            <Route path="/admin/editcompany/:id" element={<EditCompany/>} />

            <Route path="/company/details" element={<DisplayCompany/>} />
            <Route path="/company/coupons" element={<CouponsDisplay/>} />
            <Route path="/company/coupon/:id" element={<DisplayCouponForCompany/>} />
            <Route path="/company/add" element={<AddCoupon/>} />
            <Route path="/company/updatecoupon/:id" element={<EditCoupon/>} />

            <Route path="/customer/" element={<CouponsDisplay/>} />
            <Route path="/customer/details" element={<DisplayCustomer/>} />
            <Route path="/customer/coupon/:id" element={<DisplayCouponForCustomer/>} />
            <Route path="/customer/purchased" element={<PurchasedCoupons/>} />



            
            




            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
