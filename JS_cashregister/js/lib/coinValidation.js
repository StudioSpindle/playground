
const showCoinTypes = require('./showCoinTypes');

/**
 * coinValidation
 * @function lib/coinValidation
 * @param object | takes in the object to which the parameters should apply
 * @param coinName | name of the coin to test against
 * @param callback | action to perform
 * @returns a callback with the object, coinType and the amount
 */
module.exports = function(object, coinName, callback) {
    let coinTypes = showCoinTypes(object.coins);
    let coinType = coinName.toLowerCase();

    if (coinTypes.indexOf(`${coinType}`) > -1) {

        if (typeof callback === "function") {
            callback(object, coinType);
        }

    } else {
        throw `The coin of type '${coinType}' does not exist. Please use one of the following: ${coinTypes}`;
    }
};
