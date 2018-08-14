/**
 * showCoinTypes module
 * @module lib/showCoinTypes
 * @param {object} object containing multiple named arrays for each coin type {coin: {...}, coin2: {...}}
 * @returns {object} containing a list of all the names
 */
const showCoinTypes = function(object) {
    let coinTypes = [];
    for(let coinNameByProperty in object) {
        coinTypes.push(coinNameByProperty);
    }
    return coinTypes;
};

module.exports = showCoinTypes;