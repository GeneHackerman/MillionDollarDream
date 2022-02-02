// This needs to be the search input
var searchTerm = "AAPL"
// Fetch Simple Data 
var getStockData  = (stock)=> {
        var myKey="T2UJTKZI47JLWJ0G"
        var stockLink = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${myKey}`;
    
        fetch(stockLink).then(async function(response) {
            if (response.ok) {
                const data = await response.json();
                console.log(data)
             } else {
                 alert('Error: Search not found');
             };
          }); 
};

getStockData(searchTerm);




