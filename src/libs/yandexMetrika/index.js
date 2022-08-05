import libs from "../libs.json";

/**
 * Yandex.Metrika counter
 */

/**
 * target
 *
 * @param targetName
 * @param params
 */
export const reachGoal = (targetName, params = null) => {
    if(process.env.NODE_ENV !== 'development') {
        if (params === null) {
            window.ym(libs.yandexMetrika.id, 'reachGoal', targetName);
        } else {
            window.ym(libs.yandexMetrika.id, 'reachGoal', targetName, params);
        }
    }
};

/**
 * callback id
 *
 * @param clientID
 */
export const getClientID = clientID => {
    if(process.env.NODE_ENV !== 'development') {
        window.ym(libs.yandexMetrika.id, 'getClientID', (id) => {
            clientID(id);
            return;
        });
    }
    clientID(null);
};