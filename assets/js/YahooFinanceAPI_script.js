// --------------------------- YAHOO FINANCE API ------------------------------


//Fetch Stock data from four symbols using the yahoo finance API, jsons it into an object, then uses the object in stocklist function 


// NOTE: V1 NOT WORKING ----- USE V2  || 

fetch(“https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2020-10-14?adjusted=true&apiKey=mNgHEk6aL2MGcLCcUpq470Xhd4l8FCJK")
.then(function(response){
    return response.jason();
    

    
))



const data = await yahooStockPrices.getCurrentData('AAPL');
console.log(data); // { currency: 'USD', price: 132.05 }







