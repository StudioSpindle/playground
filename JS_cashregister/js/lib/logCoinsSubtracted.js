/**
 * logCoinsSubtracted
 * @module lib/logCoinsSubtracted
 * @param amountSubstracted
 * @param worth
 * @description Console logs the subtracted coins
 */
const logCoinsSubtracted = function(coinName, amountSubstracted, worth, total) {
    console.log(`Log: Coins of type '${coinName}' substracted: '${amountSubstracted}' of worth '${worth}', for a total of '${total}'.`);
};

module.exports = logCoinsSubtracted;