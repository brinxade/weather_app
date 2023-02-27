import { useDispatch, useSelector } from "react-redux";
import { DataFormat } from "../../api/api";
import { removeNotification, setMenuOpen } from "../../reducers/app/appReducer";
import Visualize from "../Visualize/Visualize";
import "./DataDashboard.css";

function DataDashboard(props) {
    
    const dispatch = useDispatch();
    const metrics = useSelector((state) => state.weather.metrics);
    const pos = useSelector((state) => state.weather.pos);
    const notifs = useSelector(state => state.app.notifications);
    const rtlEnabled = useSelector(state => state.weather.realtime);

    return (
        <>
        {(Object.values(metrics).every((x) => x==false ) && 
        <div className="intro">
            <h3>Greetings Visitor!</h3>
            <p>
                You can use this app to get visualized weather information for any address, or your current location. 
                Currently temperature, precipitation and wind speed are supported. 
                <br/>
                This app uses free version of the Meteomatics API, which has limited number of API requests per day. 
                If that limit is reached, you will see a message. Mock data will be displayed in this case instead of real data.
            </p>
            <p className="info notif">
                <span><i className="fa-solid fa-circle-exclamation"></i>
                Please select atleast one weather metric from the menu to 
                <strong className="link" onClick={() => { dispatch(setMenuOpen(true)); }}> get started!</strong>
                </span>
            </p>
        </div>)}

        {rtlEnabled && <p className="info notif"><span><i className="fa-solid fa-circle-exclamation"></i>Realtime updates are enabled.</span></p>}

        {(pos[0] == 0 || pos[1] == 0) && 
        <p className="warn notif"><span><i className="fa-solid fa-circle-exclamation"></i>Please select a valid location from the menu.</span></p>}

        {notifs.map((n, idx) => {
            return (
                <p key={"notif_"+idx} className={`notif ${n.type}`}>
                    <span><i className="fa-solid fa-circle-exclamation"></i>{n.content}</span>
                    <button className="notif-close" onClick={(e) => { dispatch(removeNotification(idx)); }}><i className="fa-solid fa-times"></i></button>
                </p>
            )
        })}

        {Object.keys(metrics).map((k, idx) => {
            if(!metrics[k]) return null;
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