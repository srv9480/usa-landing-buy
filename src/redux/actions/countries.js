import { COUNTRIES } from "@redux/constants";
import BaseRequest from '@requests';

export default () => dispatch => {
    const axios = new BaseRequest()
    return axios.get(`/api/v1/Data/countries`)
        .then(response => {
            const { data } = response
            if (!data) {
                return Promise.reject(response);
            }
            dispatch({type: COUNTRIES, data });
            return data;
        }
        ).catch(e => {
            Promise.reject(e);
        });
}