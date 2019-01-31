
'use strict';

// import calculateByCoin from './lib/calculateByCoin';
// import sortCoinsList from './lib/sortCoinsList';
// import { convertToPounds, convertToCents } from './lib/convertCurrency';
// import calculateCapacity from './lib/calculateCapacity';
// import logCoinsSubtracted from './lib/logCoinsSubtracted';
//
// import coinValidation from './lib/coinValidation';

interface Coin {
    amount: number,
    worth: number
}

/**
 * Cashregister
 * @constructor
 */
class Cashregister {
    private _penny: Coin;
    private _nickel: Coin;
    private _dime: Coin;
    private _quarter: Coin;
    private _pound: Coin;

    constructor(
        pennyAmount: number,
        nickelAmount: number,
        dimeAmount: number,
        quarterAmount: number,
        poundAmount: number
    ) {
        this._penny = { amount: pennyAmount, worth: 1 };
        this._nickel = { amount: nickelAmount, worth: 5 };
        this._dime = { amount: dimeAmount, worth: 10 };
        this._quarter = { amount: quarterAmount, worth: 25 };
        this._pound = { amount: poundAmount, worth: 100 };
    }

    get numberOfPennies() {
        return this._penny.amount;
    }

    set numberOfPennies(amount: number) {
        this._penny.amount = amount;
    }

}

// const register1 = Object.create(Cashregister.prototype);
let register1 = new Cashregister( 12, 10, 2, 12, 30 );

console.log(register1.numberOfPennies); // should output 12
register1.numberOfPennies = 24;
console.log(register1.numberOfPennies); // should output 24


    // /**
    //  * setCoin
    //  * @description Setter, set's the coin value based on the coin's name
    //  * @param coinName The coin name
    //  * @param amount The amount that should be set
    //  */
    // set coin(coinName, amount) {

    //     console.log(  ); // this isn't working

    //     coinValidation(this, coinName, function(object, coinType){
    //         object.coins[coinType].amount = amount;
    //     });
    // }

    // /**
    //  * getAmountByCoin
    //  * @description Getter, get coin by user input
    //  * @param coinName Coin name based on user input
    //  * @returns {*} A string with the amount of coins by coin type
    //  */
    // get amountByCoin(coinName) {
    //     let amount;

    //     coinValidation(this, coinName, function(object, coinType){
    //         amount = object.coins[coinType].amount;
    //     });

    //     return amount;
    // }

    // /**
    //  * getCalculatedByCoin
    //  * @description Getter, get coin by user input
    //  * @param coinName Coin name based on user input
    //  * @returns {number} A string with the subtotal amount of cents per coin type
    //  */
    // get calculatedByCoin(coinName) {
    //     let coinSubTotal = 0;

    //     coinValidation(this, coinName, function(object, coinType){
    //         coinSubTotal = calculateByCoin(object.coins[coinType].amount, object.coins[coinType].worth);
    //     });

    //     return coinSubTotal;
    // }

    // /**
    //  * getTotalRegisterAmount
    //  * @returns the amount of money in pounds or cents (default)
    //  * @param unit
    //  * @returns {number} the amount of money in pounds or cents (default)
    //  */
    // get totalRegisterAmount(unit) {
    //     let totalInCents = 0;

    //     for (let coin in this.coins) {
    //         totalInCents += this.getCalculatedByCoin(coin);
    //     }

    //     if(unit === 'pounds') {
    //         return convertToPounds(totalInCents); // total in register
    //     } else {
    //         return totalInCents;
    //     }
    // }

    // subtractByCoin(coin, subtractBy) {
    //     this.coins[coin].amount -= subtractBy;
    // }

    // /**
    //  * removeFromCashRegister
    //  * @param amountGiven
    //  * @param unit
    //  * @returns {string}
    //  * @description Removes the cash from the register
    //  */
    // removeFromCashregister(amountGiven, unit = 'cents') {

    //     if (unit === 'pounds') {
    //         amountGiven = convertToCents(amountGiven);
    //     }

    //     if (this.getTotalRegisterAmount() < amountGiven) {
    //         return `Can't return money since there isn't a sufficient amount in the register.`;
    //     }

    //     console.log(`Log: Going to subtract from the register: ${convertToPounds(amountGiven)} (${amountGiven} cents)`);

    //     let remainingAmount = amountGiven;
    //     let sortedCoinsList = sortCoinsList(this.coins);
    //     let totalSubtracted = 0;

    //     for (let coin in sortedCoinsList) {

    //         let coinCapacity = calculateCapacity(sortedCoinsList[coin].amount, sortedCoinsList[coin].worth, remainingAmount);

    //         // calculate remaining amount
    //         remainingAmount = coinCapacity.remaining;

    //         // subtract the defined amount of coins
    //         this.subtractByCoin(coin, coinCapacity.coinsSubtracted);

    //         // log the amount that has been subtracted
    //         logCoinsSubtracted([coin], coinCapacity.coinsSubtracted, sortedCoinsList[coin].worth, calculateByCoin(coinCapacity.coinsSubtracted, sortedCoinsList[coin].worth));
    //         totalSubtracted += coinCapacity.coinsSubtracted * sortedCoinsList[coin].worth;
    //     }
    // }


// // get amount based on object (create closed object later)
// console.dir(`Total directly using the object property Cashregister.coins.penny.amount: ${Cashregister.coins.penny.amount}`);
// console.log('---');
// // TODO: move this to private function, this property should not be publicly available

// // get amounts with getter
// console.log(`Subtotal amounts before subtraction:`);
// console.log(`Total of Pounds using the getter Cashregister.getAmountByCoin('pound'): ${Cashregister.getAmountByCoin('pound')}`);
// console.log(`Total of Nickels using the getter Cashregister.getAmountByCoin('nickel'): ${Cashregister.getAmountByCoin('nickel')}`);
// console.log(`Total of Dimes using the getter Cashregister.getAmountByCoin('dime'): ${Cashregister.getAmountByCoin('dime')}`);
// console.log(`Total of Quaters using the getter Cashregister.getAmountByCoin('quarter'): ${Cashregister.getAmountByCoin('quarter')}`);
// console.log(`Total of Pennies using the getter Cashregister.getAmountByCoin('Penny'): ${Cashregister.getAmountByCoin('Penny')}`);
// console.log('---');
// console.log(`Subtotal amount in cents by coin before subtraction:`);
// console.log(`Total of Pounds in cents using the getter Cashregister.getCalculatedByCoin('pound'): ${Cashregister.getCalculatedByCoin('pound')}`);
// console.log(`Total of Nickels in cents using the getter Cashregister.getCalculatedByCoin('nickel'): ${Cashregister.getCalculatedByCoin('nickel')}`);
// console.log(`Total of Dimes in cents using the getter Cashregister.getCalculatedByCoin('dime'): ${Cashregister.getCalculatedByCoin('dime')}`);
// console.log(`Total of Quarters in cents using the getter Cashregister.getCalculatedByCoin('quarter'): ${Cashregister.getCalculatedByCoin('quarter')}`);
// console.log(`Total of Pennies in cents using the getter Cashregister.getCalculatedByCoin('Penny'): ${Cashregister.getCalculatedByCoin('Penny')}`);
// console.log('---');
// console.log(`Total amounts before subtraction:`);
// console.log(`Total amount in cents: ${Cashregister.getTotalRegisterAmount()}`);
// console.log(`Total amount in pounds: ${Cashregister.getTotalRegisterAmount('pounds')}`);
// console.log('---');

// Cashregister.removeFromCashregister('20.47', 'pounds');

// console.log('---');
// console.log(`Remaining in the register: ${Cashregister.getTotalRegisterAmount('pounds')}`);
// console.log(`Subtotal amounts AFTER subtraction:`);
// console.log(`Total of Pounds using the getter Cashregister.getAmountByCoin('pound'): ${Cashregister.getAmountByCoin('pound')}`);
// console.log(`Total of Nickels using the getter Cashregister.getAmountByCoin('nickel'): ${Cashregister.getAmountByCoin('nickel')}`);
// console.log(`Total of Dimes using the getter Cashregister.getAmountByCoin('dime'): ${Cashregister.getAmountByCoin('dime')}`);
// console.log(`Total of Quaters using the getter Cashregister.getAmountByCoin('quarter'): ${Cashregister.getAmountByCoin('quarter')}`);
// console.log(`Total of Pennies using the getter Cashregister.getAmountByCoin('Penny'): ${Cashregister.getAmountByCoin('Penny')}`);


