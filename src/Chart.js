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
import { getChartData } from './ApiService';


const Chart = ({ activeTicker, spyData }) => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            if (activeTicker === 'SPY') return;  // use the ref data from 
            try {
                setError(null) // Clear existing error messages.
                const response = await getChartData(activeTicker);
                console.log('ive got res...', response.data);
                response.status === 200 ? setChartData(response.data) : setError(response)
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message)
            }
        };

        // Call the fetchData function when activeTicker changes
        fetchData();
    }, [activeTicker]); // The dependency array ensures useEffect is called whenever activeTicker changes


    if (error) {
        return (
            <div>
                <h3>Error!</h3>
                <p>{JSON.stringify(error)}</p>
            </div>
        )
    } else if (spyData) {
        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend
        );

        const { labels } = spyData;

        let datasets = [];

        // We want to compare every performance to the SPY. So always show spy as well as the activeTicker.
        if (activeTicker !== 'SPY' && !!chartData) {
            console.log('lets load something', activeTicker, 'chartData', chartData);
            datasets =
                [{
                    label: activeTicker,
                    data: chartData.closing,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }, {
                    label: 'SPY',
                    data: spyData.closing,
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 0.5)',
                    tension: 0.1
                }]
        } else datasets = [{
            label: 'SPY',
            data: spyData.closing,
            fill: false,
            borderColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.1
        }]

        const data = {
            labels: labels,
            datasets
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
            <Line data={data} options={options} />
        </div>)
    }
}

export default Chart