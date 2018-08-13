import calculateByCoin from '../js/lib/calculateByCoin';

let coins = {
    penny: { amount: 3, worth: 1 },
    nickel: { amount: 3, worth: 5 },
    dime: { amount: 3, worth: 10 },
    quarter: { amount: 3, worth: 25 },
    pound: { amount: 3, worth: 100 }
};

test('calculate the total worth of coins combined by coin type', () => {
    expect(calculateByCoin(coins.penny.amount, coins.penny.worth)).toBe(3);
    expect(calculateByCoin(coins.nickel.amount, coins.nickel.worth)).toBe(15);
    expect(calculateByCoin(coins.dime.amount, coins.dime.worth)).toBe(30);
    expect(calculateByCoin(coins.quarter.amount, coins.quarter.worth)).toBe(75);
    expect(calculateByCoin(coins.pound.amount, coins.pound.worth)).toBe(300);
});