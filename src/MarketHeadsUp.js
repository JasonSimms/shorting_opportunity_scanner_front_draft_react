import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const StockPerformance = () => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    // Function to fetch stock data
    const fetchStockData = async () => {
      setStockData({ performance1Day: 0.3, performance3Days: 2.1, performance5Days: 4, performance1Month: -10 });
      // try {
      //   const response = await axios.get('https://api.example.com/stock/TSLA');
      //   setStockData(response.data); // Assuming the API returns the stock data in a suitable format
      // } catch (error) {
      //   console.error('Error fetching stock data:', error);
      // }
    };

    // Fetch stock data when the component mounts
    fetchStockData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const getBackgroundColor = (value) => {
    if (value > 2) {
      return 'darkgreen';
    } else if (value > 0) {
      return 'lightgreen';
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
    { label: '1 Day Performance', value: stockData?.performance1Day },
    { label: '3 Days Performance', value: stockData?.performance3Days },
    { label: '5 Days Performance', value: stockData?.performance5Days },
    { label: '1 Month Performance', value: stockData?.performance1Month },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {performanceData.map((performance, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            margin: '10px',
            backgroundColor: getBackgroundColor(performance.value),
          }}
        >
          <h3>{performance.label}</h3>
          <p>{performance.value}%</p>
        </div>
      ))}
    </div>
  );
};

export default StockPerformance;