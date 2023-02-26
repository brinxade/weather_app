import Convertor from '../app/convert';
import { store } from '../app/store';

const getTodayDate = () => {
    let d = new Date()
    return d.toISOString().split('T')[0];
}

export const DataFormat = {
    temp: {
        name: "Temperature",
        unit: "C",
        icon: "fa-temperature-three-quarters",
        query: (lat, long, time) => {
            console.log(lat, long);
            let q = `https://api.meteomatics.com/${getTodayDate()}T${time[0]}:00:00.000-05:00--${getTodayDate()}T${time[1]}:00:00.000-05:00:PT30M/t_2m:C/${lat},${long}/json?model=mix`;
            console.log(q);
            return q;
        }
    },
    ppt: {
        name: "Precipitation",
        unit: "mm",
        icon: "fa-droplet",
        query: (lat, long, time) => {
            let q = `https://api.meteomatics.com/${getTodayDate()}T${time[0]}:00:00.000-05:00--${getTodayDate()}T${time[1]}:00:00.000-05:00:PT30M/precip_6h:mm/${lat},${long}/json?model=mix`;

            return q;
        }
    },
    ws: {
        name: "Wind Speed",
        unit: "kmh",
        icon: "fa-wind",
        query: (lat, long, time) => {
            let q = `https://api.meteomatics.com/${getTodayDate()}T${time[0]}:00:00.000-05:00--${getTodayDate()}T${time[1]}:00:00.000-05:00:PT30M/wind_speed_FL10:kmh/${lat},${long}/json?model=mix`;

            return q;
        }
    }
};