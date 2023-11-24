import { useState, useEffect } from 'react';

/* Styling */
import './App.css';

/*React Components */
import BotScreenerTable from './BotScreenerTable';
import Banner from './Banner';
import MarketHeadsUp from './MarketHeadsUp';
import Chart from './Chart';
import { getChartData } from './ApiService';

function App() {
  /* Global State Management*/
  const [activeTicker, setActiveTicker] = useState('SPY');
  const [spyData, setSpyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getChartData('SPY');
        return response.status === 200 ? setSpyData(response.data) : console.error(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when activeTicker changes
    fetchData();
  }, []);

  return (
    <div className="App">
      <Banner />
      <MarketHeadsUp />
      <BotScreenerTable setActiveTicker={setActiveTicker} />
      <Chart activeTicker={activeTicker} spyData={spyData} />
    </div>
  );
}

export default App;
