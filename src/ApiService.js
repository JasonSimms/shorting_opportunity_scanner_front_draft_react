// Methods for retrieving data from the scanner bot backend

// Mock API Calls
function apiCallDelay(data, timeoutRange = [100, 3000]) {
    return new Promise((res) => {
        const timeout = Math.random() * (timeoutRange[1] - timeoutRange[0]) + timeoutRange[0];
        setTimeout(() => { res({ status: 200, message: 'success', data: data }) }, timeout)
    })
}

function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


// get Spy short term performance
export function getMarketPerformance() {
    const randomNumber = () => {
        const anyNumber = generateRandomNumber(-10, 10)
        const roundedNumber = anyNumber.toFixed(1)
        return (roundedNumber)
    };
    const mockData = {
        'performance1Day': randomNumber(),
        'performance3Day': randomNumber(),
        'performance5Day': randomNumber(),
        'performance1Month': randomNumber()
    }
    return apiCallDelay(mockData)
}

// get bot results 
export function getBotResults() {
    const mockData = [
        { Ticker: "SPY", RSI: 75, Stochastics: 80, Bollinger: 85 },
        { Ticker: "IWM", RSI: 60, Stochastics: 50, Bollinger: 60 },
        { Ticker: "VGT", RSI: 20, Stochastics: 10, Bollinger: -5 },
        { Ticker: "XOP", RSI: 80, Stochastics: 60, Bollinger: 105 },
        { Ticker: "XLP", RSI: 50, Stochastics: 20, Bollinger: -50 },
      ]
    // const mockData = {
    //     RSI: generateRandomNumber(20, 75),
    //     // MACDDivergence: generateRandomNumber(0, 10),  this may be more challenging to quantify maybe try charting.
    //     Stochastics: generateRandomNumber(0, 100), //80% or above is overbought
    //     BollingerProximity: generateRandomNumber(-20, 0) //`SMA is ${distancePercentage.toFixed(2)}% away from the upper Bollinger Band.`
    // }
    return apiCallDelay(mockData)
}

// get chart data
export function getChartData(ticker) {
    const mockData = {
        data: {
            priceData: [],
            bollingerData: {},
            RSI: []
        }
    }
    return apiCallDelay(mockData)
}
