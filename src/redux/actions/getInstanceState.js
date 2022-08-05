import {GETINSTANCESTATE} from "@redux/constants";

let state = {
    // First Step
    selected_youGive: null,
    selected_youGet: null,
    value_network: null,
    value_youGive: null,
    value_youGet: null,
    value_destinationAddress: null,
    value_partnerName: null,

    // Second Step
    value_emailAddress: null,
    value_phoneNumber: null,
    verify_contact: null,

    // Third Step
    value_cardNumber: null,
    value_validThru: null,
    value_cvc: null,
    value_fullNameCard: null,
    check_agreement: null,

    // Requests
    value_exchangeRequestId: null,
    value_exchangeRequestHash: null,
    value_tradeUserId: null
};

export default (obj, callback) => dispatch => {
    if(obj) {
        state = Object.assign(state, obj);
    }

    dispatch({type: GETINSTANCESTATE, payload: state});

    if(typeof callback === 'function') {
        callback(state)
    }
};