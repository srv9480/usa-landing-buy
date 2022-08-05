import axios from "axios";

// const API_LINK = process.env.API_LINK || "https://indacoin.com";
const API_LINK = 'https://gw.indacoin.io'


/**
 * Base request class
 */
class BaseRequest {
    /**
     * Send POST request
     *
     * @param url
     * @param params
     * @param headers
     *
     * @returns {Promise}
     */
    post(url, params = {}, headers = {}) {
        headers['x-requested-with'] = 'XMLHttpRequest';

        return axios.post(API_LINK + url, params, {
            headers,
        });
    }

    /**
     * Send GET request
     *
     * @param url
     * @param params
     *
     * @returns {Promise}
     */
    get(url, params = {}) {
        const protocol = /^http(s)?/.test(url);

        return axios.get(protocol ? url : API_LINK + url, params, {
            headers: {'x-requested-with': 'XMLHttpRequest'},
        });
    }

    /**
     * Send PUT request
     *
     * @param url
     * @param params
     *
     * @returns {Promise}
     */
     put(url, params = {}) {
        const protocol = /^http(s)?/.test(url);

        return axios.put(protocol ? url : API_LINK + url, params, {
            headers: {'x-requested-with': 'XMLHttpRequest'},
        });
    }
}

export default BaseRequest;