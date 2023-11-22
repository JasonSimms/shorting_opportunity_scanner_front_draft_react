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


/* Development Live API Calls */
export async function getPolygonChartData(ticker) {
    const polygonApiKey = process.env.REACT_APP_POLYGON || null;
    console.log('getPolygonChartData Fired ticker: ', ticker);

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
        const response = await fetch(buildPolygonApiUrl(apiParams));

        if (response.ok){
            const responseData = await response.json();
            // console.log('polygonResponse: ', Object.keys(responseData));
            // Check if the data is nested under a property (e.g., 'data')
            const data = responseData.data || responseData;
            const chartData = data.results;
            // console.log(chartData);
            return {
                status: 200,
                message: 'success',
                data : chartData,
            };
        } else {
            console.error('Error from polygon API!', response);
            return {
                status: response.status,
                message: 'failure',
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