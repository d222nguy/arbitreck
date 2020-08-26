import React from 'react';
import {Line} from 'react-chartjs-2';
import {useSelector} from 'react-redux';

const LineChart = () => {
    const rates = useSelector(state => state.rates);
    const dates = useSelector(state => state.dates);
    const data = {
        labels: dates,
        datasets: [
            {
                labels: 'Sales for 2020 (in millions)',
                data: rates
            }
        ]
    }
    return(
        <Line data = {data}/>
    );
}
export default LineChart;