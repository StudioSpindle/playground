/**
 * Returns an object based on a coin and remaining amount
 * @function calcCapacity
 * @module lib/calcCapacity
 * @param {string} amount The amount of coins
 * @param {string} worth The worth of the coin
 * @param {string} remainingTotal Total of remaining amount tot calculate
 * @return {object.remaining} The amount of coins that can be subtracted without it overflowing the whole number
 *         {object.coinsSubtracted} The remaining amount of total
 *
 */

function calcCapacity(amount, worth, remainingTotal) {

    let necessaryCoins = Math.floor(remainingTotal / worth); // rounded value
    let necessaryCoinWorth = necessaryCoins * worth;

    // skip the coin if the remainingTotal is not devidable by a single coin worth
    if(necessaryCoins == 0) {
        return {
            remaining: remainingTotal, // return default remaining total for next coin
            coinsSubtracted: 0
        };
    } else {
        remainingTotal = (remainingTotal - necessaryCoinWorth);

        return {
            remaining: remainingTotal,
            coinsSubtracted: necessaryCoins
        };
    }
};

module.exports = calcCapacity;