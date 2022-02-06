var search = document.querySelector("#search");
var cryptoBtnEl = document.querySelector(".crypto-btn");
var stockBtnEl = document.querySelector(".stock-btn")

// Crypto Elements 
var cryptoFormEl = document.querySelector("#crypto")
var searchNameEl = document.querySelector(".search")
var symbolEl = document.querySelector(".symbol");
var percentEl = document.querySelector(".percent");
var marketCapEl = document.querySelector(".market-cap");
var volumeEl = document.querySelector(".volume");
var priceEl = document.querySelector(".price");

// Stock Elements
var stockFormEl = document.querySelector("#stocks");
var stockSearchEl = document.querySelector(".stock-search");
var stockPriceEl = document.querySelector(".stock-price");
var stockPercentEl = document.querySelector(".stock-percent");
var stockHighEl = document.querySelector(".high");
var stockLowEl = document.querySelector(".low");

// Search History Elements 



var searchHandlerCrypto = (event)=> {
 // console.log(event);
    var searchVal = search.value.trim();
    event.preventDefault();
    // clear form 
    searchNameEl.textContent = "";
    symbolEl.textContent = "";
    percentEl.textContent = "";
    marketCapEl.textContent = "";
    volumeEl.textContent = "";
    priceEl.textContent = "";
    
    // Hide other form, display form 
    stockFormEl.setAttribute("class", "hide");
    cryptoFormEl.removeAttribute("class", "hide");

    // Make sure there is a search value
    if (searchVal) {
        getCryptoData(searchVal)
    } else {
        alert('Enter a stock or crypto to search');
    }
}

var searchHandlerStock = (event)=> {
    var searchVal = search.value.trim().toUpperCase();
    event.preventDefault();
    console.log(event)
    // clear form values 
    stockHighEl.textContent = "";
    stockLowEl.textContent = "";
    stockPercentEl.textContent = "";
    stockPriceEl.textContent = "";

    // Hide other form, Display current form 
    cryptoFormEl.setAttribute("class", "hide");
    stockFormEl.removeAttribute("class", "hide");
    
    // Make sure there is a search Value
    if (searchVal) {
        getStockData(searchVal);
    } else {
        alert('Enter a stock or crypto to search');
    }
    console.log(stockFormEl)
}

var displayCoinData = (cryptoData)=>{
    // console.log(cryptoData);
    var searchTerm = cryptoData[Object.keys(cryptoData)]

        // Get Price 
    var price = `Price: ${searchTerm.usd.toLocaleString()} usd`;
    priceEl.textContent += price ;

        // Get 24-hr Change 
    var percentChange = searchTerm.usd_24h_change;
    var roundPercent = percentChange.toString().slice(0,5);
    // console.log(`Percent Change: ${roundPercent}%`);
    percentEl.textContent += `Percent Change: ${roundPercent}%`

        // Get 24-hr market cap 
    var marketCap = searchTerm.usd_market_cap;
    // console.log(`24Hr Market Cap: ${marketCap.toLocaleString()}`);
    

    // Get 24hr Volume 
    var volume = searchTerm.usd_24h_vol;
    var volumeEdited = volume.toLocaleString()
    // console.log(`24Hr Volume: ${volume.toLocaleString()}`)
    volumeEl.textContent += `Volume: ${volumeEdited} usd`
};

var displayDetailedData = (cryptoData)=> {
    // console.log(cryptoData);

            // Get symbol 
    var symbol = cryptoData.symbol.toUpperCase();
    // console.log(`Symbol: ${symbol}`);
    symbolEl.textContent += `Symbol: ${symbol}`

             // Get Name 
    var coinName = cryptoData.name
    searchNameEl.textContent = coinName

    // // Get Rank 
    // var rank = cryptoData.market_cap_rank;
    // console.log(`Market Cap Rank: ${rank}`);

    // // Get Image (large, small, thumb)
    // var image = cryptoData.image.thumb;
    // console.log(image);

    // // Get Website 
    // var site = cryptoData.links.homepage[0];
    // console.log(site);

        // Market Cap 
    var marketCap = cryptoData.market_data.market_cap.usd.toLocaleString();
    // console.log(`Market Cap: ${marketCap} usd`);
    marketCapEl.textContent += ` Market Cap: ${marketCap} usd`;
};

var displayTrending = (trending)=> {
    console.log(trending)
    var list = trending.coins
    for (let i = 0; i < list.length; i++) {
        // Get Coin from list
        console.log(`${i+1}: ${list[i].item.name}`);
        // Get Market Cap Rank
        console.log(`Market Cap Rank: ${list[i].item.market_cap_rank}`);
        // Price BTC 
        console.log(`Price in Bitcoin: ${list[i].item.price_btc}`);
        // symbol
        console.log(`Symbol: ${list[i].item.symbol}`);
        // image (thumb, small, large,)
        console.log(list[i].item.thumb);
    }
}

// Fetch Trending Coins 
var trendingCoins = ()=> {
    var cryptoLink = 'https://api.coingecko.com/api/v3/search/trending';
    fetch(cryptoLink).then(async function(response) {
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayTrending(data);
         } else {
             alert('Error: Cryptocurrency not found');
         }
    }).catch(function(error){
        console.log(error);
        alert("Unable to connect to database")
    })
    
};
// trendingCoins()

// Fetch Detailed Market Data 
var detailedData = (coin)=> {
    var cryptoLink = `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&developer_data=false&sparkline=false`

    fetch(cryptoLink).then(async function(response) {
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayDetailedData(data);
         } else {
             alert('Error: Search not found')
         };
    }).catch(function(error){
        console.log(error);
        alert("Unable to connect to database")
    })
};
// detailedData()

// Fetch Simple Data 
var getCryptoData = (coin)=> {
    var cryptoLink = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}%2C%20ether&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`;
    
    fetch(cryptoLink).then(async function(response) {
       if (response.ok) {
           const data = await response.json();
        //    console.log(data);
           displayCoinData(data);
           detailedData(coin)
        } else {
            alert('Error: Search not found.')
        };
     }).catch(function(error){
        console.log(error);
        alert("Unable to connect to database")
    })
    // detailedData(coin)
};

// Finhib API Search by stock symbol
var displayStockData = (stockData)=> {
    // console.log(stockData);
    // My price value 
    var price = stockData.c
    stockPriceEl.textContent = `Price: ${price}`
    // My percent Change 
    var percentChange = stockData.dp;
    // console.log(`Price ${price} Percent: ${percentChange}`)
    stockPercentEl.textContent = `Percent Change: ${percentChange}%`

    var high = stockData.h
    var low = stockData.l
    stockHighEl.textContent = `Today's High: ${high}`
   stockLowEl.textContent = `Today's Low: ${low}`
    var searchVal = search.value.trim().toUpperCase()
    stockSearchEl.textContent = searchVal
}

var getStockData = (input)=> {
    
    var myKey = "c7t7lsqad3i8dq4tsmb0"
    var site = `https://finnhub.io/api/v1/quote?symbol=${input}&token=${myKey}`
    fetch(site).then(async function(response) {
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayStockData(data);
        } else {
            alert('Error: Search not found.')
        };
    }).catch(function(error){
        console.log(error);
        alert("Unable to connect to database")
    })
};

var stockNews = ()=> {
    var myKey = "c7t7lsqad3i8dq4tsmb0"
    var site = `https://finnhub.io/api/v1/news?category=general&token=${myKey}`;

    fetch(site).then(async function(response) {
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            alert('Error: Search not found.')
        };
    }).catch(function(error){
        console.log(error);
        alert("Unable to connect to database")
    })
}



cryptoBtnEl.addEventListener("click", searchHandlerCrypto);
stockBtnEl.addEventListener("click", searchHandlerStock);

