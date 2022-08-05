import {combineReducers} from "redux";

import currencyes               from "@redux/reducers/currencyes";
import countries               from "@redux/reducers/countries";
import getInstanceStateStatus   from "@redux/reducers/getInstanceStateStatus";
import getInstanceState         from "@redux/reducers/getInstanceState";

export default combineReducers({
    getInstanceState,
    getInstanceStateStatus,
    currencyes,
    countries
});