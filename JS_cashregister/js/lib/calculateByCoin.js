/**
 * calculateByCoin module
 * @module lib/calculateByCoin
 * @param {number} quantity The number of coins
 * @param {number} worth The worth of the coin
 * @returns {number} The total worth of a coin by quantity
 */
const calculateByCoin = (quantity, worth) => { return quantity * worth };

module.exports = calculateByCoin;
