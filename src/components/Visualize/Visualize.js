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
import { useDispatch, useSelector } from 'react-redux';
import { DataFormat } from '../../api/api';
import convert from '../../app/convert';
import { pushNotification } from '../../reducers/app/appReducer';

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

    const REALTIME_INTERVAL = 1; // In minutes
    const rtlEnabled = useSelector(state => state.weather.realtime);
    const pos = useSelector(state => state.weather.pos);
    const t = useSelector(state => state.weather.timeRange);
    const [rtlId, setRtlId] = useState(0);

    const dispatch = useDispatch();

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

    const fetchData = () => {
      fetch(DataFormat[props.dataKey].query(pos, t), {
        method: 'GET',
        mode: 'cors',
        headers: {
            "Authorization": process.env.REACT_APP_API_AUTH
        }
      }).then((res) => { 
        return res.json(); 
      })
      .then((json) => {
        let data = convert.apiToApp(json);
        setData(data.values);
        setLabels(data.labels);
      }).catch((err) => {
        dispatch(pushNotification({id: "001", type: "error", content: "API request limit reached."}));
      });
    };

    // Fetch data on component mount
    useEffect(()=>{
      fetchData();
    }, [pos, t, props.dataKey]);

    // Realtime data fetch logic
    useEffect(()=>{

      if(rtlEnabled) {
        let id = setInterval(fetchData, REALTIME_INTERVAL * 2000);
        setRtlId(id);
      } else {
        clearInterval(rtlId);
      }

      return ()=>{ clearInterval(rtlId); };
    }, [rtlEnabled]);

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
