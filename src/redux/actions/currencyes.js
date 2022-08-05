import {CURRENCIES} from "@redux/constants";
import {currencyes} from "@requests/currency/Currencyes"

export default (successCallback) => dispatch => {
    const singleTon = currencyes.getInstance();

    singleTon.request();
    singleTon.response((data) => {
        const payload = data;
        window.req = Object.assign(window.req || {}, {[CURRENCIES]: payload});

        if(typeof successCallback === 'function') {
            successCallback(payload);
        }

        dispatch({type: CURRENCIES, payload: payload});
    });
}