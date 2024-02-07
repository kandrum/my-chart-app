import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Analyze() {
    const location = useLocation();
    const [barChartData, setBarChartData] = useState({});
    const [pieChartData, setPieChartData] = useState({});

    useEffect(() => {
        if (location.state?.fileData) {
            const data = location.state.fileData;

            // Check if data is an array and has content
            if (Array.isArray(data) && data.length > 0) {
                // Aggregate oil production by year for the bar chart
                const productionByYear = data.reduce((acc, row) => {
                    const year = row.year;
                    const production = parseFloat(row.oil_prod32_14) || 0;
                    acc[year] = (acc[year] || 0) + production;
                    return acc;
                }, {});

                // Aggregate oil production by country for the pie chart
                const productionByCountry = data.reduce((acc, row) => {
                    const country = row.cty_name;
                    const production = parseFloat(row.oil_prod32_14) || 0;
                    acc[country] = (acc[country] || 0) + production;
                    return acc;
                }, {});

                // Convert aggregated data to chart format for the bar chart
                const barChartLabels = Object.keys(productionByYear);
                const barChartDataSet = Object.values(productionByYear);

                setBarChartData({
                    labels: barChartLabels,
                    datasets: [{
                        label: 'Oil Production by Year',
                        data: barChartDataSet,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }]
                });

                // Convert aggregated data to chart format for the pie chart
                const pieChartLabels = Object.keys(productionByCountry);
                const pieChartDataSet = Object.values(productionByCountry);

                setPieChartData({
                    labels: pieChartLabels,
                    datasets: [{
                        label: 'Oil Production by Country',
                        data: pieChartDataSet,
                        backgroundColor: pieChartLabels.map(() => `hsla(${Math.random() * 360}, 100%, 50%, 0.5)`),
                    }]
                });
            } else {
                console.error('Data is not an array or is empty:', data);
            }
        } else {
            console.error('fileData is undefined');
        }
    }, [location.state?.fileData]);

    const chartContainerStyle = {
        width: '100%', // Use the full width of the container
        maxWidth: '800px', // Set a maximum width for the charts
        margin: '20px auto',

    };

    const individualChartStyle = {
        width: '800px', // Fixed width for both charts
        height: '800px',
    };

    return (
        <div>
            <h1>Data Analysis</h1>
            <div style={chartContainerStyle}>
                <div style={individualChartStyle}>
                    <h2>Bar Chart - Oil Production by Year</h2>
                    {barChartData.labels ? <Bar data={barChartData} /> : <p>No bar chart data available.</p>}
                </div>
                <div style={individualChartStyle}>
                    <h2>Pie Chart - Oil Production by Country</h2>
                    {pieChartData.labels ? <Pie data={pieChartData} /> : <p>No pie chart data available.</p>}
                </div>
            </div>
        </div>
    );
}

export default Analyze;
