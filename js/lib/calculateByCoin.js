/**
 * @param amount | the amount of the coin
 * @param worth | the worth of the coin
 * @returns {number}
 */
const calculateByCoin = (amount, worth) => { return amount * worth };

module.exports = { calculateByCoin };
