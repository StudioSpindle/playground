
const monetaryUnit = 100;

/**
 * convertToPounds module
 * @module lib/convertToPounds
 * @param totalAmount of money
 * @returns {number} amount in pounds
 */
const convertToPounds = (totalAmount) => parseFloat(totalAmount) / monetaryUnit;

/**
 * convertToCents module
 * @module lib/convertToCents
 * @param totalAmount of money
 * @returns {number} amount in cents
 */
const convertToCents = (totalAmount) => parseFloat(totalAmount) * monetaryUnit;

module.exports = {
    convertToPounds: convertToPounds,
    convertToCents: convertToCents
};