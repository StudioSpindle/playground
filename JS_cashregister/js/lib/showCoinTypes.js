/**
 * showCoinTypes module
 * @function lib/showCoinTypes
 * @param {object} object containing multiple named arrays for each coin type {coin: {...}, coin2: {...}}
 * @returns {object} containing a list of all the names
 */
module.exports = function(object) {
    let coinTypes = [];
    for(let coinNameByProperty in object) {
        coinTypes.push(coinNameByProperty);
    }
    return coinTypes;
};
