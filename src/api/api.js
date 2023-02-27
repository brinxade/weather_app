import { Utility } from '../app/util';
 
// In seconds
export const REALTIME_INTERVAL = 5;
const API_PATH = `https://${process.env.REACT_APP_API_USER}:${process.env.REACT_APP_API_PASS}@api.meteomatics.com`;

export const DataFormat = {
    temp: {
        name: "Temperature",
        unit: "C",
        icon: "fa-temperature-three-quarters",
        visType: "line",
        query: (pos, time) => {
            let q = `${API_PATH}/${Utility.getTodaysDateFormatted()}T${time[0]}:00:00.000-05:00--${Utility.getTodaysDateFormatted()}T${time[1]}:00:00.000-05:00:PT30M/t_2m:C/${pos[0]},${pos[1]}/json?model=mix`;
            console.log(q);
            return q;
        }
    },
    ppt: {
        name: "Precipitation",
        unit: "mm",
        icon: "fa-droplet",
        visType: "bar",
        query: (pos, time) => {
            let q = `${API_PATH}/${Utility.getTodaysDateFormatted()}T${time[0]}:00:00.000-05:00--${Utility.getTodaysDateFormatted()}T${time[1]}:00:00.000-05:00:PT30M/precip_6h:mm/${pos[0]},${pos[1]}/json?model=mix`;
            return q;
        }
    },
    ws: {
        name: "Wind Speed",
        unit: "kmh",
        icon: "fa-wind",
        visType: "line",
        query: (pos, time) => {
            let q = `${API_PATH}/${Utility.getTodaysDateFormatted()}T${time[0]}:00:00.000-05:00--${Utility.getTodaysDateFormatted()}T${time[1]}:00:00.000-05:00:PT30M/wind_speed_FL10:kmh/${pos[0]},${pos[1]}/json?model=mix`;
            return q;
        }
    }
};