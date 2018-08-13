/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_calculateByCoin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/calculateByCoin */ \"./js/lib/calculateByCoin.js\");\n/* harmony import */ var _lib_calculateByCoin__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_calculateByCoin__WEBPACK_IMPORTED_MODULE_0__);\n\nconst monetaryUnit = 100;\n\n\n\n/**\n * @param object | object which holds a property with multiple named arrays for each coin type\n * @returns array ...\n */\nconst showCoinTypes = function(object) {\n    let coinTypes = [];\n    for(let coinNameByProperty in object) {\n        coinTypes.push(coinNameByProperty);\n    }\n    return coinTypes;\n};\n\n/**\n * Returns a list with a specific order (every two keys are merged into one)\n * @param {object} object that should be rearranged\n * @returns {object} object which has been rearranged\n */\nfunction rearrangeList(obj) {\n    let result = [];\n    for(let i = 0; i < obj.length; i+= 2) {\n        result[obj[i+1][0]] = obj[i];\n    }\n    return result;\n}\n\n/**\n * @param object\n * @returns sorted array\n * @description takes an object and sorts it (to subtract the coin with the highest amount first)\n */\nfunction sortCoinsList(obj) {\n    let result = [];\n    for (let coin in obj) {\n        result.push([coin], obj[coin]);\n    }\n    result.sort((b, a) => a[1] - b[1]); // worth is on the second value (1)\n    result.reverse(); // start with largest first\n    result = rearrangeList(result);\n\n    return result;\n}\n\n/**\n * @param amount of money\n * 100 = devider to calculate pounds\n */\nconst convertToPounds = (totalAmount) => parseFloat(totalAmount) / monetaryUnit;\n\n/**\n * @param amount of money\n * 100 = devider to calculate pounds\n */\nconst convertToCents = (totalAmount) => parseFloat(totalAmount) * monetaryUnit;\n\n/**\n * coinValidation\n * @param object | takes in the object to which the parameters should apply\n * @param coinName | name of the coin to test against\n * @param callback | action to perform\n * @returns a callback with the object, coinType and the amount\n */\nconst coinValidation = function(object, coinName, callback) {\n    let coinTypes = showCoinTypes(object.coins);\n    let coinType  = coinName.toLowerCase();\n\n    if (coinTypes.indexOf(`${coinType}`) > -1) {\n\n        if (typeof callback === \"function\") {\n            callback(object, coinType);\n        }\n\n    } else {\n        throw `The coin of type '${coinType}' does not exist. Please use one of the following: ${coinTypes}`;\n    }\n}\n\n/**\n * Returns an object based on a coin and remaining amount\n * @function  calcCapacity\n * @param     {string} amount | the amount of coins\n *            {string} worth | the worth of the coin\n *            {string} remainderTotal | Total of remaining amount tot calculate\n * @return    {object}\n *            - remaining | the amount of coins that can be subtracted without it overflowing the whole number\n *            - coinsSubtractet | the remaining amount of total\n */\n\nfunction calcCapacity(amount, worth, remainingTotal) {\n\n    let necessaryCoins = Math.floor(remainingTotal / worth); // rounded value\n    let necessaryCoinWorth = necessaryCoins * worth;\n\n    // skip the coin if the remainingTotal is not devidable by a single coin worth\n    if(necessaryCoins == 0) {\n        return {\n            remaining: remainingTotal, // return default remaining total for next coin\n            coinsSubtracted: 0\n        };\n    } else {\n        remainingTotal = (remainingTotal - necessaryCoinWorth);\n\n        return {\n            remaining: remainingTotal,\n            coinsSubtracted: necessaryCoins\n        };\n    }\n}\n\n/**\n * console logs the subtracted coins\n * @param amountSubstracted\n * @param worth\n */\nconst logCoinsSubtracted = function(coinName, amountSubstracted, worth, total) {\n    console.log(`Log: Coins of type '${coinName}' substracted: '${amountSubstracted}' of worth '${worth}', for a total of '${total}'.`);\n}\n\n// 1. create empty object for the Til which can hold different kinds of coins\n// 2. define a lowest level common denominator, in this case the cent system\n// 3. fill the till with the coins\n\nlet Cashregister = {\n\n    coins: {\n        penny: { amount: 0, worth: 1 },\n        nickel: { amount: 0, worth: 5 },\n        dime: { amount: 0, worth: 10 },\n        quarter: { amount: 0, worth: 25 },\n        pound: { amount: 0, worth: 100 }\n    },\n\n    /**\n     * Setter, set's the coin value based on the coin's name\n     * @param coinName | the coin name\n     * @param amount | the amount that should be set\n     */\n    setCoin: function(coinName, amount) {\n\n        coinValidation(this, coinName, function(object, coinType){\n            object.coins[coinType].amount = amount;\n        });\n    },\n\n\n    subtractByCoin: function(coin, subtractBy) {\n        this.coins[coin].amount -= subtractBy;\n    },\n\n    /**\n     * Getter, get coin by user input\n     * @param coinName | coin name based on user input\n     * @returns | A string with the amount of coins by coin type\n     */\n    getAmountByCoin: function(coinName) {\n        let amount;\n\n        coinValidation(this, coinName, function(object, coinType){\n            amount = object.coins[coinType].amount;\n        });\n\n        return amount;\n    },\n\n    /**\n     * Getter, get coin by user input\n     * @param coinName | coin name based on user input\n     * @returns | A string with the subtotal amount of cents per coin type\n     */\n    getCalculatedByCoin: function(coinName) {\n        let coinSubTotal = 0;\n\n        coinValidation(this, coinName, function(object, coinType){\n            coinSubTotal = Object(_lib_calculateByCoin__WEBPACK_IMPORTED_MODULE_0__[\"calculateByCoin\"])(object.coins[coinType].amount, object.coins[coinType].worth);\n        });\n\n        return coinSubTotal;\n    },\n\n    /**\n     * Getter\n     * @returns the amount of money in pounds or cents (default)\n     */\n    getTotalRegisterAmount: function(unit) {\n        let totalInCents = 0;\n\n        for (let coin in this.coins) {\n            totalInCents += this.getCalculatedByCoin(coin);\n        }\n\n        if(unit == 'pounds') {\n            let totalInRegister = convertToPounds(totalInCents);\n            return totalInRegister;\n        } else {\n            return totalInCents;\n        }\n\n    },\n\n    removeFromCashregister: function(amountGiven, unit = 'cents') {\n\n        if (unit == 'pounds') {\n            amountGiven = convertToCents(amountGiven);\n        }\n\n        if (this.getTotalRegisterAmount() < amountGiven) {\n            return `Can't return money since there isn't a sufficient amount in the register.`;\n        }\n\n        console.log(`Log: Going to subtract from the register: ${convertToPounds(amountGiven)} (${amountGiven} cents)`);\n\n        let remainingAmount = amountGiven;\n        let sortedCoinsList = sortCoinsList(this.coins);\n        let totalSubtracted = 0;\n\n        for (let coin in sortedCoinsList) {\n\n            let coinCapacity = calcCapacity(sortedCoinsList[coin].amount, sortedCoinsList[coin].worth, remainingAmount);\n\n            // calculate remaining amount\n            remainingAmount = coinCapacity.remaining;\n\n            // subtract the defined amount of coins\n            this.subtractByCoin(coin, coinCapacity.coinsSubtracted);\n\n            // log the amount that has been subtracted\n            logCoinsSubtracted([coin], coinCapacity.coinsSubtracted, sortedCoinsList[coin].worth, Object(_lib_calculateByCoin__WEBPACK_IMPORTED_MODULE_0__[\"calculateByCoin\"])(coinCapacity.coinsSubtracted, sortedCoinsList[coin].worth));\n            totalSubtracted += coinCapacity.coinsSubtracted * sortedCoinsList[coin].worth;\n        }\n    }\n}\n\nCashregister.setCoin('penny', '12');\nCashregister.setCoin('nickel', '10');\nCashregister.setCoin('dime', '2');\nCashregister.setCoin('quarter', '12');\nCashregister.setCoin('pound', '30');\n\n// get amount based on object (create closed object later)\nconsole.dir(`Total directly using the object property Cashregister.coins.penny.amount: ${Cashregister.coins.penny.amount}`);\nconsole.log('---');\n// TODO: move this to private function, this property should not be publicly available\n\n// get amounts with getter\nconsole.log(`Subtotal amounts before subtraction:`);\nconsole.log(`Total of Pounds using the getter Cashregister.getAmountByCoin('pound'): ${Cashregister.getAmountByCoin('pound')}`);\nconsole.log(`Total of Nickels using the getter Cashregister.getAmountByCoin('nickel'): ${Cashregister.getAmountByCoin('nickel')}`);\nconsole.log(`Total of Dimes using the getter Cashregister.getAmountByCoin('dime'): ${Cashregister.getAmountByCoin('dime')}`);\nconsole.log(`Total of Quaters using the getter Cashregister.getAmountByCoin('quarter'): ${Cashregister.getAmountByCoin('quarter')}`);\nconsole.log(`Total of Pennies using the getter Cashregister.getAmountByCoin('Penny'): ${Cashregister.getAmountByCoin('Penny')}`);\nconsole.log('---');\nconsole.log(`Subtotal amount in cents by coin before subtraction:`);\nconsole.log(`Total of Pounds in cents using the getter Cashregister.getCalculatedByCoin('pound'): ${Cashregister.getCalculatedByCoin('pound')}`);\nconsole.log(`Total of Nickels in cents using the getter Cashregister.getCalculatedByCoin('nickel'): ${Cashregister.getCalculatedByCoin('nickel')}`);\nconsole.log(`Total of Dimes in cents using the getter Cashregister.getCalculatedByCoin('dime'): ${Cashregister.getCalculatedByCoin('dime')}`);\nconsole.log(`Total of Quarters in cents using the getter Cashregister.getCalculatedByCoin('quarter'): ${Cashregister.getCalculatedByCoin('quarter')}`);\nconsole.log(`Total of Pennies in cents using the getter Cashregister.getCalculatedByCoin('Penny'): ${Cashregister.getCalculatedByCoin('Penny')}`);\nconsole.log('---');\nconsole.log(`Total amounts before subtraction:`);\nconsole.log(`Total amount in cents: ${Cashregister.getTotalRegisterAmount()}`);\nconsole.log(`Total amount in pounds: ${Cashregister.getTotalRegisterAmount('pounds')}`);\nconsole.log('---');\n\nCashregister.removeFromCashregister('20.47', 'pounds');\n\nconsole.log('---');\nconsole.log(`Remaining in the register: ${Cashregister.getTotalRegisterAmount('pounds')}`);\nconsole.log(`Subtotal amounts AFTER subtraction:`);\nconsole.log(`Total of Pounds using the getter Cashregister.getAmountByCoin('pound'): ${Cashregister.getAmountByCoin('pound')}`);\nconsole.log(`Total of Nickels using the getter Cashregister.getAmountByCoin('nickel'): ${Cashregister.getAmountByCoin('nickel')}`);\nconsole.log(`Total of Dimes using the getter Cashregister.getAmountByCoin('dime'): ${Cashregister.getAmountByCoin('dime')}`);\nconsole.log(`Total of Quaters using the getter Cashregister.getAmountByCoin('quarter'): ${Cashregister.getAmountByCoin('quarter')}`);\nconsole.log(`Total of Pennies using the getter Cashregister.getAmountByCoin('Penny'): ${Cashregister.getAmountByCoin('Penny')}`);\n\n\n\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ }),

/***/ "./js/lib/calculateByCoin.js":
/*!***********************************!*\
  !*** ./js/lib/calculateByCoin.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @param amount | the amount of the coin\n * @param worth | the worth of the coin\n * @returns {number}\n */\nconst calculateByCoin = (amount, worth) => { return amount * worth };\n\nmodule.exports = { calculateByCoin };\n\n\n//# sourceURL=webpack:///./js/lib/calculateByCoin.js?");

/***/ })

/******/ });