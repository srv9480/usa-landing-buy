import {CURRENCIES} from '@redux/constants';

export default (state = null,  action) => {
    switch(action.type) {
        case CURRENCIES:
            return action.payload;
        default:
            return state;
    }
}