import React, { useState, useEffect, useMemo } from 'react';
import { getMarketPerformance } from './ApiService';
import { setCookie, getCookie } from './Utilities';
// import axios from 'axios';

const StockPerformance = () => {
  const [marketData, setMarketData] = useState(null);

  const memoizedGetMarketPerformance = useMemo(() => getMarketPerformance, []);  // useMemo can be used if the user doesn't allow cookies.

  useEffect(() => {
    // Function to fetch stock data
    // Cookies implemented limit the API rate calls. 
    const fetchStockData = async () => {
      try {
        let data = getCookie('marketData');
        if (!data) {
          data = await memoizedGetMarketPerformance();
          setCookie('marketData', JSON.stringify(data.data));
        } else {
          data = JSON.parse(data);
        } setMarketData(data);
      } catch (error) {
        console.error('Error fetching marketHeadsUp Data: ', error);
      }
    };

    // Fetch stock data when the component mounts
    fetchStockData();
  }, [memoizedGetMarketPerformance]); // Add memoizedGetMarketPerformance as a dependency

  const getBackgroundColor = (value) => {
    if (value > 2) {
      return '#408800';
    } else if (value > 0) {
      return '#397a00';
    } else if (value < 0 && value > -2) {
      return 'lightcoral';
    } else if (value <= -2) {
      return 'darkred';
    } else {
      // Default color if none of the conditions are met
      return 'white';
    }
  };

  const performanceData = [
    { label: '1 Day', value: marketData?.performance1Day },
    { label: '3 Days', value: marketData?.performance3Day },
    { label: '5 Days', value: marketData?.performance5Day },
    { label: '1 Month', value: marketData?.performance1Month },
  ];

  if (!marketData) {
    return <h3>Loading Market Data....</h3>
  } else {
    return (
      <div>
        <h2>SPY Performance</h2>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {performanceData.map((performance, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                margin: '10px',
                backgroundColor: getBackgroundColor(performance.value),
                borderRadius: "0 5px 0 5px"
              }}
            >
              <h3>{performance.label}</h3>
              <p>{performance.value}%</p>
            </div>
          ))}
        </div>
      </div>

    );
  };
};

export default StockPerformance;