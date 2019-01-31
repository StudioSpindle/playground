/**
 * convertToPounds module
 * @module lib/rearrangeList
 * @param {object} obj that should be rearranged
 * @returns {object} object which has been rearranged
 * @description Returns a list with a specific order (every two keys are merged into one)
 */
function rearrangeList(obj) {
    let result = [];
    for(let i = 0; i < obj.length; i+= 2) {
        result[obj[i+1][0]] = obj[i];
    }
    return result;
}

/**
 * sortCoinsList module
 * @module lib/sortCoinsList
 * @param obj
 * @returns sorted array
 * @description takes an object and sorts it (to subtract the coin with the highest amount first)
 */
function sortCoinsList(obj) {
    let result = [];
    for (let coin in obj) {
        result.push([coin], obj[coin]);
    }
    result.sort((b, a) => a[1] - b[1]); // worth is on the second value (1)
    result.reverse(); // start with largest first
    result = rearrangeList(result);

    return result;
}

module.exports = sortCoinsList;
