import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Graph.css';
import { useState } from 'react';
const LineChart5 = () => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'CURRENT DATA',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                fill: false,
                data: [10, 20, 30, 40, 100, 50, 150],
            },
            
        ],
    });
    // console.log("rere", chartData);
    useEffect(() => {

        const ctx = chartRef.current.getContext('2d');

        // Define chart colors



        // Define chart configuration
        const config = {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Chart.js Line Chart - Logarithmic',
                },
                hover: {
                    mode: 'nearest', // Set hover mode to 'nearest'
                    intersect: false, // Set intersect to true
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'white', // Set the color of the x-axis ticks
                            fontSize: 104, // Set the font size of the x-axis ticks
                        },
                    },
                    y: {
                        ticks: {
                            color: 'white', // Set the color of the y-axis ticks
                        },
                    },
                },

            },
        };

        // Create the chart instance
        const myLine = new Chart(ctx, config);
        const interval = setInterval(() => {
            // api : https://api.thingspeak.com/channels/2490599/fields/2.json?api_key=${apiKey}&results=2%27;
            fetch('https://api.thingspeak.com/channels/2513220/fields/2.json?api_key=${apiKey}&results=300%27;')
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    // change the labels to the created at field till 50
                    const labels = data.feeds.map((entry) => {
                        const date = new Date(entry.created_at);
                        // Format the date as needed, for example: HH:MM
                        const formattedDate = `${date.getHours()}:${date.getMinutes()}`;
                        return formattedDate;
                    });
                    // change the data to the field2 till 50
                    const data2 = data.feeds.map((entry) => entry.field2);
                    // console.log(labels);
                    // console.log(data2);
                    var f = 0;
                    // chec if there is a change from he previous data
                    if (labels == chartData.labels && data2 == chartData.datasets.data) {
                        console.log("no change")
                        f = 1;
                    }
                    // update the chart data
                    if (f === 0) {
                        setChartData({
                            labels,
                            datasets: [
                                {
                                    label: 'CURRENT DATA',
                                    backgroundColor: 'cyan',
                                    borderColor: 'cyan',
                                    fill: false,
                                    data: data2,
                                }
                            ],
                        });
                    }



                });
            // update the chart instance with the new data
            myLine.update();



        }, 5000);

        // Cleanup function to remove the chart instance when the component unmounts
        return () => {
            myLine.destroy();
            clearInterval(interval);
        };
    }, [chartData]);
    
    return (

        <div style={{
            width: '80vw', position: 'absolute', left: '10vw', top: '370vh', height: '70vh',right:'10vw'
        }}>
           

            {/* <h1>Washing Machine-1</h1>

            {
                chartData.datasets[0].data[99]==0?<h1>OFF</h1>:<h1>ON</h1>
            } */}
            
            <canvas ref={chartRef} id="canvas" />
        </div>
    );
};

export default LineChart5;