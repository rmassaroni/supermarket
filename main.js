let fetchData = async () => {
    let stockSymbol = document.querySelector('#stockInput').value;
    let apikey = 'YOUR_API_KEY'; 

    let api = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&apikey=${apikey}`;

    let res = await fetch(api);
    let data = await res.json();
    displayData(data);
};

let displayData = (data) => {
    let stockDataset = [];
    let labels = [];

    for (let date in data['Time Series (Daily)']) {
        stockDataset.unshift(parseFloat(data['Time Series (Daily)'][date]['4. close']));
        labels.unshift(date);
    }

    let ctx = document.querySelector('#chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Price',
                data: stockDataset,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
    });
};
