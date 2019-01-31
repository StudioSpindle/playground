import showCoinTypes from '../js/lib/showCoinTypes';

let coins = {
    penny: { amount: 3, worth: 1 },
    nickel: { amount: 3, worth: 5 },
    dime: { amount: 3, worth: 10 },
    quarter: { amount: 3, worth: 25 },
    pound: { amount: 3, worth: 100 }
};

const expected = ["penny", "nickel", "dime", "quarter", "pound"];

describe('showCoinTypes', () => {

    it('when given an object with properties containing an object, it returns an object with only the objects property names', () => {
        expect(showCoinTypes(coins)).toEqual(expect.objectContaining( expected ));
    });

});
