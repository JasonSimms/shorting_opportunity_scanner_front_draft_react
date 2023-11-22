import './App.css';
import BotScreenerTable from './BotScreenerTable';
import Banner from './Banner';
import MarketHeadsUp from './MarketHeadsUp';

function setActiveTicker(ticker) {
  return console.log('setactiveticker', ticker)
}


function App() {
  return (
    <div className="App">
      <Banner />
      <MarketHeadsUp />
      <BotScreenerTable setActiveTicker={setActiveTicker} />
    </div>
  );
}

export default App;
