import { COUNTRIES } from '@redux/constants';

export default (state = null,  action) => {
    switch(action.type) {
        case COUNTRIES:
            return action.data;
        default:
            return state;
    }
}