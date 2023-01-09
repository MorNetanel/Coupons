import axios from "axios";
import exp from "constants";
import CouponModel from "../Models/CouponModel";
import { CouponsState, createFetchActionCoup } from "../Redux/CouponsState";
import { couponsStore } from "../Redux/CouponsState";
import appConfig from "../Util/Config";

class HomeService{
    public async getCouponsOffLine(){
        if (couponsStore.getState().coupons.length == 0){
            const response = await axios.get<CouponModel[]> (appConfig.homeUrl);
            couponsStore.dispatch(createFetchActionCoup(response.data));
            return response.data;
        }
        else
        return couponsStore.getState().coupons;
    }
}

const homeService = new HomeService();
export default homeService;