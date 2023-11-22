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


const apiKey = process.env.REACT_APP_POLYGON || null;



const Chart = ({ activeTicker }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('useEffect called in Chart.js')
                if (activeTicker !== null) {

                    // Replace 'your-api-endpoint' with your actual API endpoint
                    const response = await getPolygonChartData(activeTicker);
                    console.log('Response: ', response)
                    response.status === 200 ? setData(response) : setError(response)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error)
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
    } else {
        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            Legend
        );

        // const labels = Utils.months({count: 7});
        const labels = [1, 2, 3, 4, 5, 6, 7]
        const data = {
            labels: labels,
            datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
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
                    text: 'Chart.js Line Chart',
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