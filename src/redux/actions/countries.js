import { COUNTRIES } from "@redux/constants";
import BaseRequest from '@requests';

export default () => dispatch => {
    const axios = new BaseRequest()
    return axios.get(`/api/v1/Data/countries`)
        .then(response => {
            const { data } = response
            if (data) {
                dispatch({type: COUNTRIES, data: data });
                return data;
            } else {
                return Promise.reject(response);
            }
        }
        ).catch(e => {
            Promise.reject(e);
        });
}