import BaseRequest from '@requests';

const axios = new BaseRequest()
export default {
    // Отправка телефона и отправка кода проверки
    AddContacts (tradeUserId, type, value) {
        return axios.post(`/api/v1/TradeUser/${tradeUserId}/contacts`, {type: type, value: value})
        .then(response => {
            if ((response || {}).data) {
                return response.data;
            } else {
                return Promise.reject(response);
            }
        })
    },
    // Повторная отправка кода
    Sendcode (tradeUserId, contactId) {
        return axios.post(`/api/v1/TradeUser/${tradeUserId}/contacts/${contactId}/sendcode`)
        .then(response => {
            if ((response || {}.data)) {
                return response.data;
            } else {
                return Promise.reject(response);
            }
        }
        ).catch(e => {
            Promise.reject(e);
        });
    },
    // Проверка введенного кода
    Verify (tradeUserId, contactId, verifycode) {
        return axios.post(`/api/v1/TradeUser/${tradeUserId}/contacts/${contactId}/verify?verificationCode=${verifycode}`)
        .then(response => {
            if ((response || {}.data)) {
                return response;
            } else {
                return Promise.reject(response);
            }
        })
    }
}
