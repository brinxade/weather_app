import { useDispatch, useSelector } from "react-redux";
import { DataFormat } from "../../api/api";
import Visualize from "../Visualize/Visualize";
import "./DataDashboard.css";

function DataDashboard(props) {
    
    const metrics = useSelector((state) => state.weather.metrics);
    const lat = useSelector((state) => state.weather.lat);
    const long = useSelector((state) => state.weather.long);

    return (
        <>
        {(lat==0 || long==0)?<p className="warn"><i className="fa-solid fa-circle-exclamation"></i>Please select a valid location from the menu.</p>:<></>}
        {(Object.values(metrics).every((x) => x==false)?<p className="info"><i className="fa-solid fa-circle-exclamation"></i>Please select atleast one metric from the menu.</p>:<></>)}

        {Object.keys(metrics).map((k) => {
            if(!metrics[k]) return <></>;
            const df = DataFormat[k];

            return (
              <div key={`dg-${k}`} className="data-group">
                <h3 className="data-title"><i className={`fa-solid ${df.icon}`}></i>{df.name}</h3>

                <div className="chart-wrapper">
                    <Visualize dataKey={k} dataTitle={df.name}/>
                </div>
              </div>
            );
        })}
        </>          
    );
}

export default DataDashboard;