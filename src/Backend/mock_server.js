/* Emulating server back end calls */
import { formatDate } from '../Utilities';
const polygonData = require('./bin/polygonData.js');


/* POLYGON.IO */
//global rate limiting for free API is 5 calls per minute. 
let lastApiCallTime = 0;
let apiCallCount = 0;
let cache = {};  //store all polygon data to reduce request traffic.


async function makePolygonApiCall(endpoint) {
    const now = Date.now();
    const timeSinceLastCall = now - lastApiCallTime;
    console.log('cache status', cache);

    if (!cache[endpoint] || now - cache[endpoint].timestamp > 60000) {   //This pseudocache will only work on a stable back end.  Frequent dev restarts will obviously reset this cache.

        // Check if enough time has passed since the last API call
        if (timeSinceLastCall < 60000 && apiCallCount >= 5) {
            // If the rate limit is reached, wait for the next minute
            const waitTime = 60000 - timeSinceLastCall;
            await new Promise(resolve => setTimeout(resolve, waitTime));

            // Reset the API call count and update the last API call time
            apiCallCount = 0;
            lastApiCallTime = Date.now();
        }

        // Make the API call
        console.log('making an api call to polygon', endpoint)
        const response = await fetch(endpoint);
        const data = await response.json();

        // Update the last API call time and increment the API call count
        lastApiCallTime = Date.now();
        data.timestamp = lastApiCallTime;
        if(data.status === 'OK') cache[endpoint] = data
        apiCallCount++;

        return data;
    } else {
        return cache[endpoint];
    }
}

const transposePolygonData = (dataSet) => {
    if (!dataSet) return null;
    const closingArray = dataSet.map(entry => entry.c);
    const labelsArray = dataSet.map(entry => formatDate(entry.t));
    return { closing: closingArray, labels: labelsArray };
}

// get chart data
export async function getChartDataFromServer(ticker) {
    let apiData = await getPolygonChartData(ticker);
    apiData.data = transposePolygonData(apiData.data); //Format for front end -chart.
    return apiData;
}


export async function getPolygonChartData(ticker) {

    // TODO using cached data instead of live! make a front end toggle to get live data.
    return ({
        status:200,
        message: 'success',
        data: polygonData.find(item => item.ticker === ticker).results
    })
    // ---------------------------------------------------------------------------------
    const polygonApiKey = process.env.REACT_APP_POLYGON || null;

    const apiParams = {
        ticker,
        startDate: '2023-11-01',
        endDate: '2023-11-22',
        adjusted: true,
        sort: 'asc',
        limit: 120,
        apiKey: polygonApiKey,
    };


    // Function to build the Polygon API URL
    // should result in someting like this: https://api.polygon.io/v2/aggs/ticker/SPY/range/1/day/2023-11-01/2023-11-22?adjusted=true&sort=asc&limit=120&apiKey=[APIKEY]
    function buildPolygonApiUrl(params) {
        const {
            ticker,
            startDate,
            endDate,
            adjusted,
            sort,
            limit,
            apiKey,
        } = params;

        return `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}?adjusted=${adjusted}&sort=${sort}&limit=${limit}&apiKey=${apiKey}`;
    }

    try {
        const endpoint = buildPolygonApiUrl(apiParams);
        const res = await makePolygonApiCall(endpoint);
        if (res.status === "OK") {
            const chartData = res.results || res;
            return {
                status: 200,
                message: 'success',
                data: chartData,
            };
        } else {
            console.error('Error from polygon API!', res);
            return {
                status: res.status || 500,
                message: res.message || 'PolygontAPI call failed',
                data: null,
            };
        }
    } catch (error) {
        console.error('Error in fetch:', error);
        return {
            status: 500,
            message: 'failure',
            data: null,
        };
    }
}



/* Mock API Calls */
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
export function getMarketPerformanceFromServer() {
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
export function getBotResultsFromServer() {
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



