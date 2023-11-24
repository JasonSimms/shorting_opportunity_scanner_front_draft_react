// Methods for retrieving data from the scanner bot backend
//...fromServer methods would be replaced with fetch or axios calls and front end error handling could be done here.
import { getChartDataFromServer, getMarketPerformanceFromServer, getBotResultsFromServer } from './Backend/mock_server';

/* new methods for mock backend */
export async function getChartData(ticker) {
    const res = await getChartDataFromServer(ticker);
    return (res);
}

export async function getMarketPerformance(){
    const res = await getMarketPerformanceFromServer();
    return res;
};

export async function getBotResults(){
    const res = await getBotResultsFromServer();
    return res;
}


