import {GETINSTANCESTATESTATUS} from "@redux/constants";

let state = {
    // Для проверки суммы в текущий момент с той которая в Cashin
    amountInCashin: null,
    amountIn: null,
    currencyIn: null,
    currencyOut: null,
    networkId: null,

    cryptoAddress: null,
    createdAt: null,

    // Для всех запросов
    exchangeRequestId: null,
    hash: null,
    // Статусы
    statusKYC: null,
    statusCashin: null,
    statusApruve: null
};

export default (obj, callback) => dispatch => {
    if(obj) {
        state = Object.assign(state, obj);
    }

    dispatch({type: GETINSTANCESTATESTATUS, payload: state});

    if(typeof callback === 'function') {
        callback(state)
    }
};