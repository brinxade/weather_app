import { useDispatch, useSelector } from "react-redux";
import { DataFormat } from "../../api/api";
import { removeNotification } from "../../reducers/app/appReducer";
import Visualize from "../Visualize/Visualize";
import "./DataDashboard.css";

function DataDashboard(props) {
    
    const dispatch = useDispatch();
    const metrics = useSelector((state) => state.weather.metrics);
    const pos = useSelector((state) => state.weather.pos);
    const notifs = useSelector(state => state.app.notifications);

    return (
        <>
        {(pos[0] == 0 || pos[1] == 0) && 
        <p className="warn notif"><span><i className="fa-solid fa-circle-exclamation"></i>Please select a valid location from the menu.</span></p>}

        {(Object.values(metrics).every((x) => x==false ) && 
        <p className="info notif"><span><i className="fa-solid fa-circle-exclamation"></i>Please select atleast one metric from the menu.</span></p>)}

        {notifs.map((n, idx) => {
            return (
                <p key={"notif_"+idx} className={`notif ${n.type}`}>
                    <span><i className="fa-solid fa-circle-exclamation"></i>{n.content}</span>
                    <button className="notif-close" onClick={(e) => { dispatch(removeNotification(idx)); }}><i className="fa-solid fa-times"></i></button>
                </p>
            )
        })}

        {Object.keys(metrics).map((k, idx) => {
            if(!metrics[k]) return;
            const df = DataFormat[k];

            return (
              <div key={`dg-${idx}`} className="data-group">
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