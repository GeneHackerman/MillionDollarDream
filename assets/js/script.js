var request = require("request");

var stock_url = "http://finance.yahoo.com/webservice/v1/symbols/FB/quote?format=json&view=%E2%80%8C%E2%80%8Bdetail";

request(stock_url, function (error, response, body) { 
    if (!error && response.statusCode == 200) {  
        var stock_data = body;
        console.log("Yahoo Finance API: ", stock_data)
        var stock_price = stock_data.list.resources[0].resource.fields.price;
        console.log("stock_price: ", stock_price);       
    };
});




IMPORTANT NOTES: 

'
GET CURRENT DATA / LIVE DATA: 
### Example 

```js
const data = await yahooStockPrices.getCurrentData('AAPL');
console.log(data); // { currency: 'USD', price: 132.05 }
```

## getCurrentPrice

Returns a promise which resolves with only the current price, as a number.

### Example

```js
const price = await yahooStockPrices.getCurrentPrice('AAPL');
console.log(price); // 132.05
```

For backward compatibility with earlier versions you can also provide a callback as the second parameter, in which case no promise will be returned.

```js
yahooStockPrices.getCurrentPrice('AAPL', (err, price) => {
    console.log(price); // 132.05
});
```
