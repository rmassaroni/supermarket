import logo from './logo.svg';
import './App.css';

let fetchData = async () => {
    let stockSymbol = document.querySelector('#stockInput').value;
    // let apikey = read(); 
    let apikey = "key";

    let api = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&apikey=${apikey}`;

    let res = await fetch(api);
    let data = await res.json();
    displayData(data);
    console.log('fetching');
};

let displayData = (data) => {
    let stockDataset = [];
    let labels = [];
    console.log(data);

    for (let date in data['Time Series (Daily)']) {
        console.log(date);
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

function App() {
    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
