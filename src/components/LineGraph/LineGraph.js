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
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import convert from '../../app/convert';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function LineGraph(props) {

    const [labels, setLabels] = useState([]);
    const [d, setData] = useState([]);

    const options = {
      responsive: true,
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
    
    const [dataFormat, setDataFormat] = useState({
        labels: [],
        datasets: [
        {
            label: props.dataTitle,
            data: [0,1,2],
            borderColor: '#004472',
            backgroundColor: '#00447233',
        }
      ],
    });

    useEffect(()=>{
      fetch(`https://api.meteomatics.com/2023-02-25T12:00:00.000-05:00--2023-02-26T10:00:00.000-05:00:PT10M/t_2m:C/43.6858146,-79.7599337/json?model=mix`, {
        method: 'GET',
        headers: {
            "Authorization": "Basic ZnJlZWxhbmNlX2JhandhOmQ1NjVMa3d6VFQ="
        }
      }).then((res)=>{ return res.json(); })
      .then((json) => {
        let data = convert.apiToApp(json);

        dataFormat.labels = data.labels;
        dataFormat.datasets[0].data = data.values;

        let newDF = {...dataFormat};
        newDF.labels = data.labels;
        newDF.datasets[0].data = data.values;

        console.log(newDF);

        setDataFormat(newDF);
      });
      
    }, []);

    return (
        <Line options={options} data={dataFormat} />
    );
};

export default LineGraph;
