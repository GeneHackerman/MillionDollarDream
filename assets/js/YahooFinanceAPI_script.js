
var displayCoinData = (cryptoData)=>{
    var searchTerm = cryptoData[Object.keys(cryptoData)]
    console.log(searchTerm)
    // Last updated 
    var timestamp = searchTerm.last_updated_at; 
    console.log(timestamp);
    var date = new Date(timestamp * 1000);
    console.log(`Last Updated: ${date.getMonth()+1}/${(date.getDate())}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    // Get Price 
    var price = searchTerm.usd;
    console.log(`Price: ${price} usd`);
    // Get 24-hr Change 
    var percentChange = searchTerm.usd_24h_change;
    var roundPercent = percentChange.toString().slice(0,5)
    console.log(`Percent Change: ${roundPercent}%`);
    // Get market cap 
    var marketCap = searchTerm.usd_market_cap;
    console.log(`24Hr Market Cap: ${marketCap.toLocaleString()}`)
    // Get 24hr Volume 
    var volume = searchTerm.usd_24h_vol;
    console.log(`24Hr Volume: ${volume.toLocaleString()}`)
};

var displayDetailedData = (cryptoData)=> {
    console.log(cryptoData);
    // Get symbol 
    var symbol = cryptoData.symbol.toUpperCase();
    console.log(`Symbol: ${symbol}`);
    // Get Rank 
    var rank = cryptoData.market_cap_rank;
    console.log(`Market Cap Rank: ${rank}`);
    // Get Image (large, small, thumb)
    var image = cryptoData.image.thumb;
    console.log(image);
    // Get Website 
    var site = cryptoData.links.homepage[0];
    console.log(site);
    // Get All time Highs 
    var allTimeHigh = cryptoData.market_data.ath.usd.toLocaleString();
    console.log(`All Time High: ${allTimeHigh} usd`)
    // Get All Time Low
    var allTimeLow = cryptoData.market_data.atl.usd.toLocaleString();
    console.log(`All Time Low: ${allTimeLow} usd`);
    // Get All Time Change Percent
    var allPercentChange = cryptoData.market_data.atl_change_percentage.usd.toLocaleString();
    console.log(`Total Percent Change: ${allPercentChange}%`);
    // Get Current Price 
    var price = cryptoData.market_data.current_price.usd.toLocaleString();
    console.log(`Current Price: ${price} usd`);
    // 24Hr High 
    var dayHigh = cryptoData.market_data.high_24h.usd.toLocaleString();
    console.log(`24hr High: ${dayHigh} usd`)
    // 24hr Low 
    var dayLow = cryptoData.market_data.low_24h.usd.toLocaleString();
    console.log(`24hr Low: ${dayLow} usd`);
    // Market Cap 
    var marketCap = cryptoData.market_data.market_cap.usd.toLocaleString();
    console.log(`Market Cap: ${marketCap} usd`);
    // 24hr percent change
    var dayPercentChange = cryptoData.market_data.price_change_24h;
    console.log(`24hr Percent Change: ${dayPercentChange}%`)
    // Coins in circulation 
    var totalSupply = cryptoData.market_data.total_supply.toLocaleString();
    console.log(`Total Supply: ${totalSupply}`)

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
      });
};
// trendingCoins()

// Fetch Detailed Market Data 
var detailedData = ()=> {
    var coinId = "solana"
    var cryptoLink = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&developer_data=false&sparkline=false`

    fetch(cryptoLink).then(async function(response) {
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayDetailedData(data);
         } else {
             alert('Error: Cryptocurrency not found');
         };
      });
};
// detailedData()

// Fetch Simple Data 
var getCryptoData = ()=> {
    var coinId = "ethereum";
    var cryptoLink = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}%2C%20ether&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`;
    
    fetch(cryptoLink).then(async function(response) {
       if (response.ok) {
           const data = await response.json();
        //    console.log(data);
           displayCoinData(data);
        } else {
            alert('Error: Cryptocurrency not found');
        };
     });
};
getCryptoData()

// .catch(function(error){
//     console.log(error)
//     alert("Unable to connect to database")
// });







