import React, { useState, useEffect } from 'react';
import { getMarketPerformance } from './ApiService';
import { setCookie, getCookie } from './Utilities';

const StockPerformance = () => {
  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = getCookie('marketData');   // Cookies implemented limit the API rate calls. 
        console.log('ive got a cookie!', data);
        if (!data) {
          data = await getMarketPerformance();
          setCookie('marketData', JSON.stringify(data.data), 0.00347222222);  //5min expiration on cookie
          return setMarketData(data.data)
        } else {
          data = JSON.parse(data);
          return setMarketData(data);
        } 
      } catch (error) {
        console.error('Error fetching marketHeadsUp Data: ', error);
      }
    };

    // Fetch stock data when the component mounts
    fetchData();
  }, []);

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
    console.log(marketData);
    return (
      <div>
        <h2>SPY Performance</h2>
        <p>{JSON.stringify(marketData)}</p>
        <div style={{ display: 'flex', flexDirection: 'row', width: '90%', marginLeft: "auto", marginRight: "auto", height: "10vh" }}>
          {performanceData.map((performance, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                margin: '5px',
                padding: '5px',
                backgroundColor: getBackgroundColor(performance.value),
                borderRadius: "0 5px 0 5px"
              }}
            >
              <h4>{performance.label}</h4>
              <p>{performance.value}%</p>
            </div>
          ))}
        </div>
      </div>

    );
  };
};

export default StockPerformance;