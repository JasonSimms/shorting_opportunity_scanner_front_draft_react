import React, { useState, useEffect } from 'react';
import { getMarketPerformance } from './ApiService';
// import axios from 'axios';

const StockPerformance = () => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    // Function to fetch stock data
    const fetchStockData = async () => {
      try {
        const response = await getMarketPerformance();
        setStockData(response.data); // Assuming the API returns the stock data in a suitable format
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    // Fetch stock data when the component mounts
    fetchStockData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

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
    { label: '1 Day', value: stockData?.performance1Day },
    { label: '3 Days', value: stockData?.performance3Day },
    { label: '5 Days', value: stockData?.performance5Day },
    { label: '1 Month', value: stockData?.performance1Month },
  ];

  return (
    <div>
<h2>Spy Performance</h2>
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

export default StockPerformance;