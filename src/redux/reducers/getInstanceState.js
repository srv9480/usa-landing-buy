import {GETINSTANCESTATE} from '@redux/constants';

export default (state = null,  action = {}) => {
    switch (action.type) {
        case GETINSTANCESTATE:
            return Object.assign({}, action.payload);
        default:
            return state;
    }
}