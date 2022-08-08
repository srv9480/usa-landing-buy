import BaseRequest from "@requests";


let instance = null;

export const currencyes = class extends BaseRequest {
    static getInstance() {
        switch (instance) {
            case null:
                instance = new this;
                break;
        }

        return instance;
    }
    constructor() {
        super();

        this._dataCallback = [];
    }
    response(successCallback, failCallback) {
        const shift = this._dataCallback.shift();
        if(!shift) {
            return;
        }
        switch (typeof successCallback) {
            case 'function':
                shift.promise.then(successCallback);
                break;
        }

        switch (typeof failCallback) {
            case 'function':
                shift.promise.catch(failCallback);
                break;
            default:
                shift.promise.catch(() => {
                    setTimeout(() => {
                        this.request(...shift.arguments);
                        this.response(successCallback);
                    }, 20_000);
                });
                break;
        }
    }
    request() {
        this._dataCallback.push({
            arguments,
            promise: new Promise((resolve, reject) => {
                this.get(`/api/v1/Data/currencies?sourceType=Exchanger`).then((response) => {
                    if (typeof response.data === 'undefined') {
                        reject(response);
                        return;
                    }
                    resolve(response.data);
                }).catch(reject);
            })
        });
    }
};