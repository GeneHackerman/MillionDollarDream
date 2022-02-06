var search = document.querySelector("#search");
var cryptoBtnEl = document.querySelector(".crypto-btn");
var stockBtnEl = document.querySelector(".stock-btn");
var clearHistoryBtn = document.querySelector("#clear-history");

// Crypto Elements 
var cryptoFormEl = document.querySelector("#crypto");
var searchNameEl = document.querySelector(".search");
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


var clearStockForm = ()=> {
    stockHighEl.textContent = "";
    stockLowEl.textContent = "";
    stockPercentEl.textContent = "";
    stockPriceEl.textContent = "";

    // Hide other form, Display current form 
    cryptoFormEl.setAttribute("class", "hide");
    stockFormEl.removeAttribute("class", "hide");
    
}

var clearCryptoForm = ()=> {
    searchNameEl.textContent = "";
    symbolEl.textContent = "";
    percentEl.textContent = "";
    marketCapEl.textContent = "";
    volumeEl.textContent = "";
    priceEl.textContent = "";
    
    // Hide other form, display form 
    stockFormEl.setAttribute("class", "hide");
    cryptoFormEl.removeAttribute("class", "hide");

}

var searchHandlerCrypto = (event)=> {
 // console.log(event);
    var searchVal = search.value.trim();
    event.preventDefault();
    // clear form 
    clearCryptoForm();
    // Make sure there is a search value
    if (searchVal) {
        getCryptoData(searchVal);
        saveCryptoSearch(searchVal)
    } else {
        alert('Enter a stock or crypto to search');
    }
    
}

var searchHandlerStock = (event)=> {
    var searchVal = search.value.trim().toUpperCase();
    
    event.preventDefault();
    console.log(event)
    // clear form values 
    clearStockForm();
    // Make sure there is a search Value
    if (searchVal) {
        getStockData(searchVal);
        saveStockSearch(searchVal);
    } else {
        alert('Enter a stock or crypto to search');
    }
    // console.log(stockFormEl)
    
}

var pastStockSearchHandler = (event)=> {
    console.log(event);
    event.stopPropagation();
    var stock = event.target.firstChild.data;
    console.log(stock);
    clearStockForm();
    if (stock) {
        getStockData(stock);
    }
  
}

var pastCryptoSearchHandler = (event)=> {
    console.log(event);
    event.stopPropagation();
    var crypto = event.target.firstChild.data;
    console.log(crypto);
    clearCryptoForm();
    if (crypto) {
        getCryptoData(crypto);
    }
   
}

function displayCoinData(cryptoData){
    // console.log(cryptoData);
    var searchTerm = cryptoData[Object.keys(cryptoData)]

        // Get Price 
    var amount = searchTerm.usd.toLocaleString()
    var price = `Price: ${amount} usd`;
    priceEl.textContent += price ;
    
        // Get 24-hr Change 
    var percentChange = searchTerm.usd_24h_change;
    var roundPercent = percentChange.toString().slice(0,5);
    // console.log(`Percent Change: ${roundPercent}%`);
    percentEl.textContent += `Percent Change: ${roundPercent}%`

    // Get 24hr Volume 
    var volume = searchTerm.usd_24h_vol;
    var volumeEdited = volume.toLocaleString()
    // console.log(`24Hr Volume: ${volume.toLocaleString()}`)
    volumeEl.textContent += `Volume: ${volumeEdited} usd`


};

function displayDetailedData(cryptoData) {
    console.log(cryptoData);

            // Get symbol 
    var symbol = cryptoData.symbol.toUpperCase();
    // console.log(`Symbol: ${symbol}`);
    symbolEl.textContent += `Symbol: ${symbol}`

            // Get Name 
    var coinName = cryptoData.name
    searchNameEl.textContent = coinName

            // Market Cap
    var marketCap = cryptoData.market_data.market_cap.usd.toLocaleString();
    // console.log(`Market Cap: ${marketCap} usd`);
    marketCapEl.textContent = ` Market Cap: ${marketCap} usd`;

};

function displayTrending(trending) {
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
function trendingCoins() {
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
        console.log("Unable to connect to database")
    })
    
};
// trendingCoins()

// Fetch Detailed Market Data 
function detailedData(coin) {
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
        console.log("Unable to connect to database")
    })
};
// detailedData()

// Fetch Simple Data 
function getCryptoData(coin) {
    var lowercase = coin.toLowerCase();
    var cryptoLink = `https://api.coingecko.com/api/v3/simple/price?ids=${lowercase}%2C%20ether&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`;
    
    fetch(cryptoLink).then(async function(response) {
       if (response.ok) {
           const data = await response.json();
        //    console.log(data);
           displayCoinData(data);
           detailedData(coin);

        } else {
            alert('Error: Search not found.')
        };
     }).catch(function(error){
        console.log(error);
        console.log("Unable to connect to database")
    })
    // detailedData(coin)
};

// Finhib API Search by stock symbol
function displayStockData(stockData) {
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
}

function getStockData(input) {
    
    var myKey = "c7t7lsqad3i8dq4tsmb0"
    var site = `https://finnhub.io/api/v1/quote?symbol=${input}&token=${myKey}`
    fetch(site).then(async function(response) {
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayStockData(data);
            stockSearchEl.textContent = ""
            stockSearchEl.textContent = input
    
        } else {
            alert('Error: Search not found.')
        };
    }).catch(function(error){
        console.log(error);
        console.log("Unable to connect to database")
    })
};

// Get the trending stock news 
function stockNews() {
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
        console.log("Unable to connect to database")
    })
}
var stockSearchArr = [];
var stockListEl = document.querySelector(".stock-history");

// Save searches to Local Storage. 
var saveStockSearch = (search)=> {
    //Create Button 
    stockEl = document.createElement("button");
    stockEl.textContent = search;
    stockEl.classList = ("save-search btn");
    stockEl.setAttribute = ("type", "submit");
    stockEl.setAttribute = ("data-stocks", search);
    //Append to the List 
    stockListEl.appendChild(stockEl);
    
    if (!stockSearchArr.includes(search)) {
        stockSearchArr.push(search);
    }
    JSON.parse(localStorage.setItem("stocks", JSON.stringify(stockSearchArr)));
}

var cryptoSearchArr = [];
var cryptoListEl = document.querySelector(".crypto-history");

// Save searches to Local Storage. 
var saveCryptoSearch = (search)=> {
    //Create Button 
    cryptoEl = document.createElement("button");
    cryptoEl.textContent = search;
    cryptoEl.classList = ("save-search btn");
    cryptoEl.setAttribute = ("type", "submit");
    cryptoEl.setAttribute = ("data-crypto", search);
    //Append to the List 
    cryptoListEl.appendChild(cryptoEl);
    
    if (!cryptoSearchArr.includes(search)) {
        cryptoSearchArr.push(search);
    }
    JSON.parse(localStorage.setItem("crypto", JSON.stringify(cryptoSearchArr)))
}

var getStockSearch = ()=> {
    // load the data or start a new array if there is no data 
    var savedStock = JSON.parse(localStorage.getItem("stocks")) ?? [];
    // Append Data to list 
    for (let i  = 0; savedStock.length; i++) {
        var stockEl = document.createElement("button")
        stockEl.classList = "save-search btn";
        stockEl.setAttribute("type", "submit");
        stockEl.setAttribute("data-stocks", savedStock[i]);
        var text = savedStock[i]
        stockEl.textContent = `${text}`;
        stockListEl.appendChild(stockEl)
    }

}

var getCryptoSearch = ()=> {
    // load the data or start a new array if there is no data 
    var savedCrypto = JSON.parse(localStorage.getItem("crypto")) ?? [];
    // append data to list 
    for (let i  = 0; savedCrypto.length; i++) {
        var cryptoEl = document.createElement("button")
        cryptoEl.classList = "save-search btn";
        cryptoEl.setAttribute("type", "submit");
        cryptoEl.setAttribute("data-crypto", savedCrypto[i]);
        var text = savedCrypto[i]
        cryptoEl.textContent = `${text}`;
        cryptoListEl.appendChild(cryptoEl)
    }

}

getCryptoSearch();
getStockSearch();

cryptoBtnEl.addEventListener("click", searchHandlerCrypto);
stockBtnEl.addEventListener("click", searchHandlerStock);
cryptoListEl.addEventListener("click", pastCryptoSearchHandler);
stockListEl.addEventListener("click", pastStockSearchHandler);
clearHistoryBtn.addEventListener("click", function(){
    // console.log(listCityEl.childNodes)
    var crypto = cryptoListEl.lastElementChild;

    // Remove last element. Select next element to remove
    while (crypto) {
        cryptoListEl.removeChild(crypto);
        crypto = cryptoListEl.lastElementChild;
    
    localStorage.removeItem("crypto");
    }
    var stock = stockListEl.lastElementChild;
    while (stock) {
        stockListEl.removeChild(stock);
        stock = stockListEl.lastElementChild;
    }
    localStorage.removeItem("stocks");
})