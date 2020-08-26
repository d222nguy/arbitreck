import React from 'react';
import {Line} from 'react-chartjs-2';
import {useSelector} from 'react-redux';
import {useEffect} from 'react'

const LineChart = () => {
    const rates = useSelector(state => state.rates);
    const dates = useSelector(state => state.dates);
    const first = useSelector(state => state.firstCurrency);
    const second = useSelector(state => state.secondCurrency);
    
    const data = {
        labels: dates,
        datasets: [
            {
                labels: `${first} - ${second} Exchange Rate - Last 7 days`,
                data: rates
            }
        ],
    };
    const options =  {
        title: {
            display: true,
            text: 'Exchange Rate - Last 1 Week: ' + first + ' to ' + second,
            fontSize: 22
        },
        layout: {
            padding: {
                top: 50,
                left: 40,
                right: 40,
                bottom: 20
            }
        }
    };
    useEffect( () =>
    {
    }, [first, second]);
    return(
        <Line data = {data} options = {options}/>
    );
}
export default LineChart;