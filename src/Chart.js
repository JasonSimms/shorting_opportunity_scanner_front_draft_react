import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { getPolygonChartData } from './ApiService';
import { formatDate } from './Utilities';


const transposePolygonData = (dataSet) => {
    const closingArray = dataSet.map(entry => entry.c);
    const labelsArray = dataSet.map(entry => formatDate(entry.t));

    return { closing: closingArray, labels: labelsArray };
}



const Chart = ({ activeTicker }) => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('useEffect called in Chart.js')
                if (activeTicker !== null) {
                    setError(null) // Clear existing error messages.
                    const response = await getPolygonChartData(activeTicker);
                    const formattedData = transposePolygonData(response.data);
                    response.status === 200 ? setChartData(formattedData) : setError(response)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message)
            }
        };

        // Call the fetchData function when activeTicker changes
        fetchData();
    }, [activeTicker]); // The dependency array ensures useEffect is called whenever activeTicker changes


    if (!activeTicker) {
        return (<h3>Select a security of interest in the table above to see more analysis</h3>)
    } else if (error) {
        return (
            <div>
                <h3>Error!</h3>
                <p>{JSON.stringify(error)}</p>
            </div>
        )
    } else if (chartData) {
        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend
        );


        // const labels = [1, 2, 3, 4, 5, 6, 7]
        const { labels } = chartData;

        const data = {
            labels: labels,
            datasets: [{
                label: activeTicker,
                data: chartData.closing,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }, {
                label: 'SPY',
                data: chartData.closing.map(el =>{
                    return el-10
                }),
                fill: false,
                borderColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.1
            }]
        };
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Performance',
                },
            },
        };

        return (<div>
            <h1>Debug Chart.js: {typeof (activeTicker)} {activeTicker} </h1>
            <Line data={data} options={options} />

        </div>)
    }
}

export default Chart