/*
 This is a visual representation of the qualifiers used in the Roberto scanner.
 The goal is to identify overbought etfs or stocks.  The first tests will look for an RSI above 69, Stochastics 

 -RSI (Relative Strenght Index):
  The Relative Strength Index is a momentum oscillator that measures the speed and change of price movements. It ranges from 0 to 100
  and is typically used to identify overbought or oversold conditions. An RSI value above 70 is often considered an indication that a 
  stock may be overbought, suggesting that it has experienced a recent run-up in price and may be due for a pullback.
 
 -Stochastics:
  A stochastic value of 100 means that prices during the current period closed at the highest price within the established time frame. 
  A stochastic value of 80 or above is considered an indication of an overbought status, with values of 20 or lower indicating oversold status.
  Like RSI, the default setting for stochastics is 14 periods.

 -Bollinger ( Bollinger Proximity to Upper band):
  Bollinger Bands consist of a middle band being an N-period simple moving average (SMA), an upper band at K times an N-period standard deviation 
  above the middle band, and a lower band at K times an N-period standard deviation below the middle band. When a stock price moves close to or exceeds
   the upper Bollinger Band, it may be considered overbought. Traders often watch for a potential reversal or pullback when the price extends beyond the upper band.
  ** This may be very subjective TODO tuning this value
  ** Will be expressed in distance from the upper band.  A negative value would indicate above the upper band
  
*/
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";



const Grid = () => {
  const [rowData] = useState([
    { Ticker: "SPY", RSI: 75, Stochastics: 80, Bollinger: 85 },
    { Ticker: "IWM", RSI: 60, Stochastics: 50, Bollinger: 60 },
    { Ticker: "VGT", RSI: 20, Stochastics: 10, Bollinger: -5 },
    { Ticker: "XOP", RSI: 80, Stochastics: 60, Bollinger: 105 },
    { Ticker: "XLP", RSI: 50, Stochastics: 20, Bollinger: -50 },
  ]);

  const [columnDefs] = useState([
    { field: "Ticker" },
    { field: "RSI" },
    { field: "Stochastics" },
    { field: "Bollinger" }
  ]);

  const tableContainerStyle = {
    width: "80%", display: "flex", justifyContent: "center", alignItems: "center"
  }


  return (
    <div className="table-container" style={{ tableContainerStyle }}>
      <h3>Bot Test Results</h3>
      <div id="qualificationGrid" className="ag-theme-material" style={{ height: 300, widows: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
      </div>
    </div>
  );
};

export default Grid;