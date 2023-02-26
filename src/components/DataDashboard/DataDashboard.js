import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api, { DataFormat } from "../../api/api";
import LineGraph from "../LineGraph/LineGraph";
import "./DataDashboard.css";

function DataDashboard(props) {
    
    const dispatch = useDispatch();
    const metrics = useSelector((state) => state.weather.metrics);
    const lat = useSelector((state) => state.weather.lat);
    const long = useSelector((state) => state.weather.long);

    return (
        <>
        {Object.keys(metrics).map((k) => {
            if(!metrics[k]) return;
            const df = DataFormat[k];

            return (
              <div key={`dg-${k}`} className="data-group">
                <h3 className="data-title"><i className={`fa-solid ${df.icon}`}></i>{df.name}</h3>

                <div className="chart-wrapper">
                    <LineGraph dataKey={k} dataTitle={df.name}/>
                </div>
              </div>
            );
        })}

        {
            (Object.values(metrics).every((x) => x==false)?<p className="info"><i className="fa-solid fa-info"></i>Please select atleast one metric from the menu.</p>:<></>)
        }
        </>          
    );
}

export default DataDashboard;