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
import { DataFormat, REALTIME_INTERVAL } from '../../api/api';
import convert from '../../app/convert';
import { Utility } from '../../app/util';
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
      console.log(process.env.REACT_APP_API_AUTH)
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
        let mockData = Utility.getMockData(parseInt(t[1])+1, parseInt(t[0]));
        setData(mockData.data);
        setLabels(mockData.labels);
        console.log(err);
        dispatch(pushNotification({id: "001", type: "error", content: "API request limit reached. Displaying mock data instead. Real data will be fetched when available."}));
      });
    };

    // Fetch data on component mount
    useEffect(()=>{
      fetchData();
    }, []);

    useEffect(()=>{
      fetchData();
    }, [pos, t]);

    // Realtime data fetch logic
    useEffect(()=>{

      let id = 0;
      if(rtlEnabled) {
        id = setInterval(fetchData, REALTIME_INTERVAL * 1000);
        setRtlId(id);
      } else {
        clearInterval(rtlId); setRtlId(0);
      }

      return ()=>{ clearInterval(id); setRtlId(0); };
    }, [rtlEnabled]);

    return DataFormat[props.dataKey].visType==='line'?(
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
