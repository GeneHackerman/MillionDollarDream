--------------------------- YAHOO FINANCE API ------------------------------


//Fetch Stock data from four symbols using the yahoo finance API, jsons it into an object, then uses the object in stocklist function 


// NOTE: V1 NOT WORKING ----- USE V2
fetch(“https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2022-01-01/2022-01-28?apiKey=mNgHEk6aL2MGcLCcUpq470Xhd4l8FCJK", configuration)

.then(function(response){
    return response.jason();
    

    
))






//NOTE 2 =  WE DON'T GIVE A F_$#%* ABOUT HISTORICAL DATA.
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   ------------------------------------ // PART II // ----------------------------------------



const request = require('request');

const baseUrl = 'https://finance.yahoo.com/quote/';

/**
 * @param {number} startMonth
 * @param {number} startDay
 * @param {number} startYear
 * @param {number} endMonth
 * @param {number} endDay
 * @param {number} endYear
 * @param {string} ticker
 * @param {('1d','1wk','1mo')} frequency
 * @param {Function} [callback]
 *
 * @return {Promise<{date: number, open: number, high:number, low:number, close:number, volume:number, adjclose:number}[]>|undefined} Returns a promise if no callback was supplied.
 */
const getHistoricalPrices = function (
    startMonth,
    startDay,
    startYear,
    endMonth,
    endDay,
    endYear,
    ticker,
    frequency,
    callback,
) {
    const startDate = Math.floor(Date.UTC(startYear, startMonth, startDay, 0, 0, 0) / 1000);
    const endDate = Math.floor(Date.UTC(endYear, endMonth, endDay, 0, 0, 0) / 1000);

    const promise = new Promise((resolve, reject) => {
        request(`${baseUrl + ticker}/history?period1=${startDate}&period2=${endDate}&interval=${frequency}&filter=history&frequency=${frequency}`, (err, res, body) => {
            if (err) {
                reject(err);
                return;
            }

            try {
                const prices = JSON.parse(body.split('HistoricalPriceStore\":{\"prices\":')[1].split(',"isPending')[0]); // Change This Historical crap. No Historical data!

                resolve(prices);
            } catch (err) {
                reject(err);
            }
        });
    });

    // If a callback function was supplied return the result to the callback.
    // Otherwise return a promise.
    if (typeof callback === 'function') {
        promise
            .then((price) => callback(null, price))
            .catch((err) => callback(err));
    } else {
        return promise;
    }
};

/**

