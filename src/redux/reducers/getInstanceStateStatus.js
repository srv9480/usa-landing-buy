import {GETINSTANCESTATESTATUS} from '@redux/constants';

export default (state = null,  action = {}) => {
    switch (action.type) {
        case GETINSTANCESTATESTATUS:
            return Object.assign({}, action.payload);
        default:
            return state;
    }
}