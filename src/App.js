import { useState } from 'react';

import './App.css';

import BotScreenerTable from './BotScreenerTable';
import Banner from './Banner';
import MarketHeadsUp from './MarketHeadsUp';

function App() {
  const [activeTicker, setActiveTicker] = useState(null);

  return (
    <div className="App">
      <Banner />
      <MarketHeadsUp />
      <BotScreenerTable setActiveTicker={setActiveTicker} />
      <div>
        TODO active ticker: {activeTicker}
      </div>
    </div>
  );
}

export default App;
