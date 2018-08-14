
'use strict';

import calculateByCoin from './lib/calculateByCoin';
import sortCoinsList from './lib/sortCoinsList';
import { convertToPounds, convertToCents } from './lib/convertCurrency';
import calculateDependency from './lib/calculateDependency';
import logCoinsSubtracted from './lib/logCoinsSubtracted';

import coinValidation from './lib/coinValidation';

let Cashregister = {

    coins: {
        penny: { amount: 0, worth: 1 },
        nickel: { amount: 0, worth: 5 },
        dime: { amount: 0, worth: 10 },
        quarter: { amount: 0, worth: 25 },
        pound: { amount: 0, worth: 100 }
    },

    /**
     * Setter, set's the coin value based on the coin's name
     * @param coinName | the coin name
     * @param amount | the amount that should be set
     */
    setCoin: function(coinName, amount) {

        coinValidation(this, coinName, function(object, coinType){
            object.coins[coinType].amount = amount;
        });
    },


    subtractByCoin: function(coin, subtractBy) {
        this.coins[coin].amount -= subtractBy;
    },

    /**
     * Getter, get coin by user input
     * @param coinName | coin name based on user input
     * @returns | A string with the amount of coins by coin type
     */
    getAmountByCoin: function(coinName) {
        let amount;

        coinValidation(this, coinName, function(object, coinType){
            amount = object.coins[coinType].amount;
        });

        return amount;
    },

    /**
     * Getter, get coin by user input
     * @param coinName | coin name based on user input
     * @returns | A string with the subtotal amount of cents per coin type
     */
    getCalculatedByCoin: function(coinName) {
        let coinSubTotal = 0;

        coinValidation(this, coinName, function(object, coinType){
            coinSubTotal = calculateByCoin(object.coins[coinType].amount, object.coins[coinType].worth);
        });

        return coinSubTotal;
    },

    /**
     * Getter
     * @returns the amount of money in pounds or cents (default)
     */
    getTotalRegisterAmount: function(unit) {
        let totalInCents = 0;

        for (let coin in this.coins) {
            totalInCents += this.getCalculatedByCoin(coin);
        }

        if(unit == 'pounds') {
            let totalInRegister = convertToPounds(totalInCents);
            return totalInRegister;
        } else {
            return totalInCents;
        }

    },

    removeFromCashregister: function(amountGiven, unit = 'cents') {

        if (unit == 'pounds') {
            amountGiven = convertToCents(amountGiven);
        }

        if (this.getTotalRegisterAmount() < amountGiven) {
            return `Can't return money since there isn't a sufficient amount in the register.`;
        }

        console.log(`Log: Going to subtract from the register: ${convertToPounds(amountGiven)} (${amountGiven} cents)`);

        let remainingAmount = amountGiven;
        let sortedCoinsList = sortCoinsList(this.coins);
        let totalSubtracted = 0;

        for (let coin in sortedCoinsList) {

            let coinCapacity = calculateDependency(sortedCoinsList[coin].amount, sortedCoinsList[coin].worth, remainingAmount);

            // calculate remaining amount
            remainingAmount = coinCapacity.remaining;

            // subtract the defined amount of coins
            this.subtractByCoin(coin, coinCapacity.coinsSubtracted);

            // log the amount that has been subtracted
            logCoinsSubtracted([coin], coinCapacity.coinsSubtracted, sortedCoinsList[coin].worth, calculateByCoin(coinCapacity.coinsSubtracted, sortedCoinsList[coin].worth));
            totalSubtracted += coinCapacity.coinsSubtracted * sortedCoinsList[coin].worth;
        }
    }
}

Cashregister.setCoin('penny', '12');
Cashregister.setCoin('nickel', '10');
Cashregister.setCoin('dime', '2');
Cashregister.setCoin('quarter', '12');
Cashregister.setCoin('pound', '30');

// get amount based on object (create closed object later)
console.dir(`Total directly using the object property Cashregister.coins.penny.amount: ${Cashregister.coins.penny.amount}`);
console.log('---');
// TODO: move this to private function, this property should not be publicly available

// get amounts with getter
console.log(`Subtotal amounts before subtraction:`);
console.log(`Total of Pounds using the getter Cashregister.getAmountByCoin('pound'): ${Cashregister.getAmountByCoin('pound')}`);
console.log(`Total of Nickels using the getter Cashregister.getAmountByCoin('nickel'): ${Cashregister.getAmountByCoin('nickel')}`);
console.log(`Total of Dimes using the getter Cashregister.getAmountByCoin('dime'): ${Cashregister.getAmountByCoin('dime')}`);
console.log(`Total of Quaters using the getter Cashregister.getAmountByCoin('quarter'): ${Cashregister.getAmountByCoin('quarter')}`);
console.log(`Total of Pennies using the getter Cashregister.getAmountByCoin('Penny'): ${Cashregister.getAmountByCoin('Penny')}`);
console.log('---');
console.log(`Subtotal amount in cents by coin before subtraction:`);
console.log(`Total of Pounds in cents using the getter Cashregister.getCalculatedByCoin('pound'): ${Cashregister.getCalculatedByCoin('pound')}`);
console.log(`Total of Nickels in cents using the getter Cashregister.getCalculatedByCoin('nickel'): ${Cashregister.getCalculatedByCoin('nickel')}`);
console.log(`Total of Dimes in cents using the getter Cashregister.getCalculatedByCoin('dime'): ${Cashregister.getCalculatedByCoin('dime')}`);
console.log(`Total of Quarters in cents using the getter Cashregister.getCalculatedByCoin('quarter'): ${Cashregister.getCalculatedByCoin('quarter')}`);
console.log(`Total of Pennies in cents using the getter Cashregister.getCalculatedByCoin('Penny'): ${Cashregister.getCalculatedByCoin('Penny')}`);
console.log('---');
console.log(`Total amounts before subtraction:`);
console.log(`Total amount in cents: ${Cashregister.getTotalRegisterAmount()}`);
console.log(`Total amount in pounds: ${Cashregister.getTotalRegisterAmount('pounds')}`);
console.log('---');

Cashregister.removeFromCashregister('20.47', 'pounds');

console.log('---');
console.log(`Remaining in the register: ${Cashregister.getTotalRegisterAmount('pounds')}`);
console.log(`Subtotal amounts AFTER subtraction:`);
console.log(`Total of Pounds using the getter Cashregister.getAmountByCoin('pound'): ${Cashregister.getAmountByCoin('pound')}`);
console.log(`Total of Nickels using the getter Cashregister.getAmountByCoin('nickel'): ${Cashregister.getAmountByCoin('nickel')}`);
console.log(`Total of Dimes using the getter Cashregister.getAmountByCoin('dime'): ${Cashregister.getAmountByCoin('dime')}`);
console.log(`Total of Quaters using the getter Cashregister.getAmountByCoin('quarter'): ${Cashregister.getAmountByCoin('quarter')}`);
console.log(`Total of Pennies using the getter Cashregister.getAmountByCoin('Penny'): ${Cashregister.getAmountByCoin('Penny')}`);


