import BaseRequest from '@requests';

const axios = new BaseRequest()
export default {

    Calculator (curInID, curOutID, amount, networkID) {
        return axios.get(`/api/v1/Calculator/GetCoinConvertAmountOut?CurIn=${curInID}&CurOut=${curOutID}&Amount=${amount}&Network=${networkID}`)
        .then(response => {
            if ((response || {}).data) {
                return response.data;
            } else {
                return Promise.reject(response);
            }
        })
    },

    // Отправка первичных данных для создания платежки
    Exchange (params) {
        return axios.post(`/api/v1/ExchangeRequests`, params)
        .then(response => {
            if ((response || {}).data || {}) {
                return response.data;
            } else {
                return Promise.reject(response);
            }
        }
        ).catch(e => {
            Promise.reject(e);
        });
    },

    // Отправка дополнительных данных в платежку, получаем 3ds форму
    Cashin (exchangeRequestId, exchangeRequestHash, card) {
        return axios.post(`/api/v1/ExchangeRequests/${exchangeRequestId}/cashinpayments?hash=${exchangeRequestHash}`, card)
        .then(response => {
            if ((response || {}).data) {
                return response.data;
            } else {
                return Promise.reject(response);
            }
        })
    },
    // Сообщаем бэку о прохождении 3ds
    CashinCheck ( id ) {
        return axios.post(`/api/v1/CashinPayments/${id}/check`)
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

    // Получение данных о транзакции
    ExchangeCheck ( id, hash ) {
        return axios.get(`/api/v1/ExchangeRequests/${id}?hash=${hash}`)
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

    // Получение токена для обращения к KYC
    AccessToken ( tradeUserID ) {
        return axios.get(`/api/v1/TradeUser/${tradeUserID}/applicant/accesstoken`)
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
    // Отмена Exchange
    CancelExchange ( exchangeRequestId, hash ) {
        return axios.post(`/api/v1/ExchangeRequests/${exchangeRequestId}/cancel?hash=${hash}`)
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

    // Подтверждение суммы обмена
    ConfirmExchange ( exchangeRequestId, hash, params ) {
        return axios.post(`/api/v1/ExchangeRequests/${exchangeRequestId}/confirm?hash=${hash}`,params)
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
}
