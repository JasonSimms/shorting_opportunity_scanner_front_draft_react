import { useState } from 'react';

import './App.css';

import BotScreenerTable from './BotScreenerTable';
import Banner from './Banner';
import MarketHeadsUp from './MarketHeadsUp';
import Chart from'./Chart';

function App() {
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
