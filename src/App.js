import { useState } from 'react';

/* Styling */
import './App.css';

/*React Components */
import BotScreenerTable from './BotScreenerTable';
import Banner from './Banner';
import MarketHeadsUp from './MarketHeadsUp';
import Chart from'./Chart';

function App() {
  /* Global State Management*/
  const [activeTicker, setActiveTicker] = useState(null);

  return (
    <div className="App">
      <Banner />
      <MarketHeadsUp />
      <BotScreenerTable setActiveTicker={setActiveTicker} />
      <Chart activeTicker={activeTicker}/>
    </div>
  );
}

export default App;
