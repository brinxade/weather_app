import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { DataFormat } from '../../api/api';
import convert from '../../app/convert';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function LineGraph(props) {

    const [sLabels, setLabels] = useState([]);
    const [sData, setData] = useState([]);

    const lat = useSelector(state => state.weather.lat);
    const long = useSelector(state => state.weather.lat);
    const t = useSelector(state => state.weather.timeRange);

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: props.title,
        },
      },
    };

    useEffect(()=>{
      fetch(DataFormat[props.dataKey].query(lat, long, t), {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Authorization": "Basic ZnJlZWxhbmNlX2JhandhOmQ1NjVMa3d6VFQ="
        }
      }).then((res) => { 
        return res.json(); 
      })
      .then((json) => {
        let data = convert.apiToApp(json);
        console.log(data);

        setData(data.values);
        setLabels(data.labels);
      });
      
    }, [lat, long, t, props.dataKey]);

    return DataFormat[props.dataKey].visType=='line'?(
      <Line options={options} data={{
        labels: sLabels,
        datasets: [
        {
            label: `${props.dataTitle} (${DataFormat[props.dataKey].unit})`,
            data: sData,
            borderColor: '#004472',
            backgroundColor: '#00447233',
        }
        ],
      }} />
    ):(
      <Bar options={options} data={{
        labels: sLabels,
        datasets: [
        {
            label: `${props.dataTitle} (${DataFormat[props.dataKey].unit})`,
            data: sData,
            borderColor: '#004472',
            backgroundColor: '#004472',
        }
        ],
      }} />
    );
};

export default LineGraph;