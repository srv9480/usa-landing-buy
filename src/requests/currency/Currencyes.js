import BaseRequest from "@requests";


let instance = null;

export const currencyes = class extends BaseRequest {
    static getInstance() {
        if (instance === null) {
            instance = new this;
        }

        return instance;
    }
    constructor() {
        super();

        this._dataCallback = [];
    }
    response(successCallback, failCallback) {
        const shift = this._dataCallback.shift();
        if(shift) {
            if(typeof successCallback === 'function') {
                shift.promise.then(successCallback);
            }

            if(typeof failCallback === 'function') {
                shift.promise.catch(failCallback);
            } else {
                shift.promise.catch(() => {
                    setTimeout(() => {
                        this.request(...shift.arguments);
                        this.response(successCallback);
                    }, 20000);
                });
            }
        }
    }
    request() {
        this._dataCallback.push({
            arguments: arguments,
            promise: new Promise((resolve, reject) => {
                this.get(`/api/v1/Data/currencies?sourceType=Exchanger`).then((response) => {
                    if (typeof response.data !== 'undefined') {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                }).catch(reject);
            })
        });
    }
};